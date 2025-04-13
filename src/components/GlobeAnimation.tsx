
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
    scene.add(argentinaMarker);

    // Create pulsing effect for Argentina marker
    const pulseGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xFCBF49,
      transparent: true,
      opacity: 0.4,
    });
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulse.position.copy(argentinaPosition);
    scene.add(pulse);

    // Create random points with faces around the globe
    const points: THREE.Mesh[] = [];
    const arrows: THREE.ArrowHelper[] = [];

    for (let i = 0; i < 15; i++) {
      // Random position for points (avoiding Antarctica)
      const lat = Math.random() * 150 - 60;
      const long = Math.random() * 360 - 180;
      const pointPosition = latLongToVector3(lat, long, radius * 1.05);
      
      const pointGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: 0x75AADB,  // Argentina blue
        transparent: true,
        opacity: 0.8,
      });
      
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.copy(pointPosition);
      scene.add(point);
      points.push(point);
      
      // Create arrow pointing to Argentina
      const direction = new THREE.Vector3().subVectors(argentinaPosition, pointPosition).normalize();
      const arrowHelper = new THREE.ArrowHelper(
        direction,
        pointPosition,
        pointPosition.distanceTo(argentinaPosition) * 0.8,
        0xFFFFFF,
        0.2,
        0.1
      );
      scene.add(arrowHelper);
      arrows.push(arrowHelper);
      
      // Create moving attendee dot
      const attendeeDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
      );
      
      // Position it at the starting point
      attendeeDot.position.copy(pointPosition);
      
      // Add to scene
      scene.add(attendeeDot);
      
      // Animate the attendee dot along the arrow
      const animateAttendee = () => {
        const startPosition = pointPosition.clone();
        const endPosition = argentinaPosition.clone();
        let progress = 0;
        
        const duration = 2000 + Math.random() * 3000; // Random duration between 2-5 seconds
        let startTime = Date.now() + Math.random() * 10000; // Random delay start - changed to let
        
        function updatePosition() {
          const now = Date.now();
          
          if (now > startTime) {
            progress = (now - startTime) / duration;
            
            if (progress < 1) {
              attendeeDot.position.lerpVectors(startPosition, endPosition, progress);
            } else {
              // Reset the animation
              progress = 0;
              startTime = Date.now() + Math.random() * 5000; // Now we can reassign to startTime
              attendeeDot.position.copy(startPosition);
            }
          }
          
          requestAnimationFrame(updatePosition);
        }
        
        updatePosition();
      };
      
      animateAttendee();
    }

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
      
      // Animate points
      points.forEach((point, index) => {
        point.rotation.y += 0.01 + (index * 0.001);
      });
      
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
