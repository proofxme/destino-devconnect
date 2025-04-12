
import { useEffect, useState } from "react";

// Set the date for Devconnect Argentina 2025 (placeholder date - adjust when actual date is known)
const DEVCONNECT_DATE = new Date('2025-11-15T00:00:00');

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = DEVCONNECT_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      <div className="flex flex-col items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center shadow-lg">
          <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.days}</span>
        </div>
        <span className="text-sm md:text-base mt-2 text-white">Days</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center shadow-lg">
          <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.hours}</span>
        </div>
        <span className="text-sm md:text-base mt-2 text-white">Hours</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center shadow-lg">
          <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.minutes}</span>
        </div>
        <span className="text-sm md:text-base mt-2 text-white">Minutes</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center shadow-lg">
          <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.seconds}</span>
        </div>
        <span className="text-sm md:text-base mt-2 text-white">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
