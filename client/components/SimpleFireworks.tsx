import React, { useEffect, useState } from 'react';

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface SimpleFireworksProps {
  isActive: boolean;
  onComplete?: () => void;
}

export default function SimpleFireworks({ isActive, onComplete }: SimpleFireworksProps) {
  const [particles, setParticles] = useState<FireworkParticle[]>([]);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9'
  ];

  const createParticles = (centerX: number, centerY: number) => {
    const newParticles: FireworkParticle[] = [];
    
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = Math.random() * 3 + 2;
      
      newParticles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60,
        maxLife: 60
      });
    }
    
    return newParticles;
  };

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    // Create multiple firework bursts
    const bursts = [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3, delay: 0 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4, delay: 300 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2, delay: 600 },
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.5, delay: 900 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3, delay: 1200 },
    ];

    bursts.forEach((burst, index) => {
      setTimeout(() => {
        setParticles(prev => [...prev, ...createParticles(burst.x, burst.y)]);
      }, burst.delay);
    });

    // Animation loop
    const animationFrame = () => {
      setParticles(prev => {
        const updated = prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life - 1
          }))
          .filter(particle => particle.life > 0);
        
        return updated;
      });
    };

    const interval = setInterval(animationFrame, 16); // ~60fps

    // Clean up after 3 seconds
    const timeout = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, onComplete]);

  if (!isActive && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ zIndex: 9999 }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 6px ${particle.color}`,
          }}
        />
      ))}
      
      {/* Success message overlay */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-500">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-2xl animate-pulse">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎆</div>
              <h3 className="text-3xl font-bold mb-2">Amazing!</h3>
              <p className="text-xl opacity-90">Special discount applied!</p>
              <div className="mt-4 text-sm opacity-75">
                ✨ Enjoy your savings! ✨
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
