import { useState, useEffect } from 'react';

// Clock Component
const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Generate all 60 minute markers
  const generateMarkers = () => {
    const markers = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6) - 90; // 6 degrees per minute, start from 12 o'clock
      const isHourMarker = i % 5 === 0; // Every 5th marker is an hour marker
      const length = isHourMarker ? 12 : 6;
      const thickness = isHourMarker ? 2 : 1;
      
      markers.push(
        <div
          key={i}
          className="absolute bg-black"
          style={{
            width: `${thickness}px`,
            height: `${length}px`,
            left: '50%',
            top: '4px',
            transformOrigin: `0 ${60}px`, // 64px radius - 4px top offset
            transform: `translateX(-50%) rotate(${angle}deg)`,
          }}
        />
      );
    }
    return markers;
  };

  return (
    <div className="relative h-32 w-32 bg-gray-100 rounded-2xl shadow-lg border border-gray-300 overflow-hidden">
      {/* All markers */}
      <div className="absolute inset-0 rounded-full">
        {generateMarkers()}
      </div>
      
      {/* Digital time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-black text-lg font-semibold tracking-tight">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Clock;