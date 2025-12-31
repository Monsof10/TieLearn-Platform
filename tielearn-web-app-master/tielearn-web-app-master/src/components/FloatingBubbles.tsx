import React from 'react';

const FloatingBubbles = () => {
  const bubbleCount = 30; // Increased number of bubbles for denser effect
  const bubbles = Array.from({ length: bubbleCount });

  const bubbleStyle = (index: number) => ({
    position: 'absolute' as const,
    bottom: '0px',
    width: `${15 + (index % 5) * 8}px`,
    height: `${15 + (index % 5) * 8}px`,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    left: `${(index * 7) % 100}%`,
    animation: `floatUp 12s ease-in-out infinite`,
    animationDelay: `${index * 0.5}s`,
    filter: 'blur(1.5px)',
    zIndex: 0,
  });

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.7;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-350px) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
      {bubbles.map((_, i) => (
        <div key={i} style={bubbleStyle(i)} />
      ))}
    </>
  );
};

export default FloatingBubbles;
