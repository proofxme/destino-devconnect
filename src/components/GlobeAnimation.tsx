
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GlobeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create Earth with textures
    const radius = 2;
    const segments = 64;
    const geometry = new THREE.SphereGeometry(radius, segments, segments);

    // Earth material with textures
    const loader = new THREE.TextureLoader();
    
    // Create Earth with day/night textures
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    
    // Day side of Earth
    const earthDayTexture = loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const earthDayMaterial = new THREE.MeshPhongMaterial({
      map: earthDayTexture,
      shininess: 5,
    });
    const earthDayMesh = new THREE.Mesh(geometry, earthDayMaterial);
    earthGroup.add(earthDayMesh);
    
    // Night side of Earth (emissive)
    const earthNightTexture = loader.load('https://threejs.org/examples/textures/planets/earth_lights_2048.png');
    const earthNightMaterial = new THREE.MeshPhongMaterial({
      map: earthDayTexture, // Base texture is still day texture
      emissiveMap: earthNightTexture,
      emissive: new THREE.Color(0x6666ff),
      emissiveIntensity: 1.5,
      shininess: 5,
    });
    const earthNightMesh = new THREE.Mesh(geometry, earthNightMaterial);
    earthGroup.add(earthNightMesh);
    
    // Cloud layer
    const cloudGeometry = new THREE.SphereGeometry(radius + 0.03, segments, segments);
    const cloudTexture = loader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.6,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthGroup.add(cloudMesh);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Argentina's approximate latitude and longitude
    const argentinaLat = -34.6037;
    const argentinaLong = -58.3816;

    // Helper function to convert lat/long to 3D position
    const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      return new THREE.Vector3(x, y, z);
    };

    // Create marker for Argentina
    const argentinaPosition = latLongToVector3(argentinaLat, argentinaLong, radius * 1.05);
    const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xFCBF49 });  // Argentina sun color
    const argentinaMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    argentinaMarker.position.copy(argentinaPosition);
    earthGroup.add(argentinaMarker);

    // Create pulsing effect for Argentina marker
    const pulseGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xFCBF49,
      transparent: true,
      opacity: 0.4,
    });
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulse.position.copy(argentinaPosition);
    earthGroup.add(pulse);

    // Array to keep track of all animated elements that should rotate with the globe
    const faceGroups: THREE.Group[] = [];
    const travelPaths: THREE.Line[] = [];
    const travelerDots: THREE.Mesh[] = [];
    
    // Create faces and travel paths
    const createFaces = () => {
      // Clear previous faces and paths
      faceGroups.forEach(group => earthGroup.remove(group));
      travelPaths.forEach(line => earthGroup.remove(line));
      travelerDots.forEach(dot => earthGroup.remove(dot));
      
      faceGroups.length = 0;
      travelPaths.length = 0;
      travelerDots.length = 0;
      
      // Number of faces to create
      const facesCount = 12;
      
      // Create faces at random positions on the globe
      for (let i = 0; i < facesCount; i++) {
        // Random position (avoiding Antarctica and oceans near Argentina)
        let lat, long;
        let distToArg; // Define the variable here
        
        do {
          lat = Math.random() * 140 - 60;  // -60 to +80 degrees latitude
          long = Math.random() * 360 - 180;  // -180 to +180 degrees longitude
          
          // Calculate distance to Argentina (arbitrary distance check)
          distToArg = Math.sqrt(
            Math.pow(lat - argentinaLat, 2) + 
            Math.pow(long - argentinaLong, 2)
          );
        } while (distToArg < 20);  // Minimum distance
        
        const facePosition = latLongToVector3(lat, long, radius * 1.05);
        
        // Create a group for the face that will be parented to the earth
        const faceGroup = new THREE.Group();
        earthGroup.add(faceGroup);
        faceGroups.push(faceGroup);
        
        // Create emoji-style face
        // Base circle for face
        const faceGeometry = new THREE.CircleGeometry(0.12, 32);
        const faceMaterial = new THREE.MeshBasicMaterial({ 
          color: Math.random() > 0.5 ? 0xFFDDAA : 0xEECB9A, 
          side: THREE.DoubleSide 
        });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        
        // Eyes
        const eyeGeometry = new THREE.CircleGeometry(0.03, 16);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.04, 0.02, 0.01);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.04, 0.02, 0.01);
        
        // Smile
        const smileGeometry = new THREE.TorusGeometry(0.05, 0.015, 16, 16, Math.PI);
        const smileMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const smile = new THREE.Mesh(smileGeometry, smileMaterial);
        smile.position.set(0, -0.03, 0.01);
        smile.rotation.z = Math.PI;
        
        // Add features to face
        face.add(leftEye);
        face.add(rightEye);
        face.add(smile);
        
        // Add face to the face group
        faceGroup.add(face);
        
        // Position and orient the face to look outward from the globe center
        faceGroup.position.copy(facePosition);
        
        // Make face look outward from the center of the earth
        faceGroup.lookAt(new THREE.Vector3(0, 0, 0));
        faceGroup.rotateY(Math.PI); // Rotate to face outward
        
        // Create travel path (parabolic curve)
        const curvePoints = createParabolicCurve(facePosition, argentinaPosition, 0.5 + Math.random() * 0.5);
        const curvePath = new THREE.CatmullRomCurve3(curvePoints);
        
        // Create a line for the travel path
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(curvePath.getPoints(64));
        const pathMaterial = new THREE.LineBasicMaterial({ 
          color: 0xFFFFFF, 
          transparent: true,
          opacity: 0.5
        });
        const pathLine = new THREE.Line(pathGeometry, pathMaterial);
        earthGroup.add(pathLine);
        travelPaths.push(pathLine);
        
        // Create traveling dot
        const travelerGeometry = new THREE.SphereGeometry(0.04, 8, 8);
        const travelerMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0 // Start invisible
        });
        const travelerDot = new THREE.Mesh(travelerGeometry, travelerMaterial);
        earthGroup.add(travelerDot);
        travelerDots.push(travelerDot);
        
        // Set up animation for dot traveling along path
        animateTraveler(travelerDot, curvePath, i * 1500); // Stagger start times
      }
    };
    
    // Create a parabolic curve between two points
    const createParabolicCurve = (start: THREE.Vector3, end: THREE.Vector3, height: number) => {
      const points = [];
      const segments = 32;
      
      // Find midpoint
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      
      // Calculate direction from center of earth to midpoint and normalize
      const normal = new THREE.Vector3().copy(mid).normalize();
      
      // Scale normal by height to get apex point above the arc
      const apex = new THREE.Vector3().copy(normal).multiplyScalar(radius * (1 + height));
      
      // Sample points along the parabola
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        
        // Quadratic bezier curve
        const point = new THREE.Vector3();
        const t1 = 1 - t;
        
        point.x = t1 * t1 * start.x + 2 * t1 * t * apex.x + t * t * end.x;
        point.y = t1 * t1 * start.y + 2 * t1 * t * apex.y + t * t * end.y;
        point.z = t1 * t1 * start.z + 2 * t1 * t * apex.z + t * t * end.z;
        
        points.push(point);
      }
      
      return points;
    };
    
    // Animate traveler dot along path
    const animateTraveler = (traveler: THREE.Mesh, path: THREE.CatmullRomCurve3, delay: number) => {
      let progress = 0;
      let active = false;
      let startTime = Date.now() + delay;
      const duration = 4000 + Math.random() * 6000; // 4-10 seconds
      
      const updatePosition = () => {
        const now = Date.now();
        
        if (!active && now > startTime) {
          active = true;
          // Make traveler visible when active
          (traveler.material as THREE.MeshBasicMaterial).opacity = 0.9;
        }
        
        if (active) {
          progress = ((now - startTime) % duration) / duration;
          
          // Get position along curve
          const position = path.getPoint(progress);
          traveler.position.copy(position);
          
          // Fade out near the end
          if (progress > 0.9) {
            const fade = 1 - (progress - 0.9) * 10;
            (traveler.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
          } else if (progress < 0.1) {
            const fade = progress * 10;
            (traveler.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
          }
        }
      };
      
      // Add to animation loop
      travelAnimations.push(updatePosition);
    };
    
    // Array to store animation functions
    const travelAnimations: (() => void)[] = [];
    
    // Initially create faces
    createFaces();
    
    // Regenerate faces every 20 seconds
    const faceGenerationInterval = setInterval(createFaces, 20000);

    // Position camera
    camera.position.z = 5;

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let animationFrameId: number;
    let pulseScale = 1;
    let pulseDirection = 0.01;
    
    const animate = () => {
      // Rotate Earth
      earthGroup.rotation.y += 0.002;
      
      // Rotate clouds slightly faster for effect
      cloudMesh.rotation.y += 0.0022;
      
      // Pulse effect
      pulseScale += pulseDirection;
      if (pulseScale > 1.5) pulseDirection = -0.01;
      if (pulseScale < 1) pulseDirection = 0.01;
      
      pulse.scale.set(pulseScale, pulseScale, pulseScale);
      
      // Update all travel animations
      travelAnimations.forEach(updateFn => updateFn());
      
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
      clearInterval(faceGenerationInterval);
      
      // Dispose geometries and materials
      geometry.dispose();
      earthDayMaterial.dispose();
      earthNightMaterial.dispose();
      cloudMaterial.dispose();
      cloudGeometry.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GlobeAnimation;
