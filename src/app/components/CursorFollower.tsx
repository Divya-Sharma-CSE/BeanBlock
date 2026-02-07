import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Large glow following cursor */}
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl"
        style={{
          width: '600px',
          height: '600px',
        }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 150,
        }}
      />
      
      {/* Smaller accent glow */}
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl"
        style={{
          width: '400px',
          height: '400px',
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 100,
          delay: 0.05,
        }}
      />
    </>
  );
};
