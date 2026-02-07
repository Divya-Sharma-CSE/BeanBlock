import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { TrendingDown, Leaf, Award, Clock } from 'lucide-react';

export const CarbonDashboard: React.FC = () => {
  const [count, setCount] = useState(0);
  const targetValue = 7.5;
  const controls = useAnimation();

  useEffect(() => {
    // Animate counter
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Mock data for history
  const history = [
    { stage: 'Farm', carbon: 2.3, timestamp: '2026-02-05 09:30', color: 'emerald' },
    { stage: 'Roast', carbon: 1.7, timestamp: '2026-02-06 14:20', color: 'orange' },
    { stage: 'Transport', carbon: 3.1, timestamp: '2026-02-06 18:45', color: 'blue' },
    { stage: 'Cup', carbon: 0.4, timestamp: '2026-02-07 08:15', color: 'amber' },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="w-16 h-16 text-emerald-400 mx-auto" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            The "WOW" Moment
          </h2>
          <p className="text-xl text-slate-400">
            Complete carbon transparency in one view
          </p>
        </motion.div>

        {/* Main carbon display - The WOW screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />
          
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-emerald-500/30 backdrop-blur-xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 1, delay: 0.5 }}
            >
              <p className="text-slate-400 text-xl mb-4">Total Verified Carbon Footprint</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Leaf className="w-16 h-16 text-emerald-400" />
                </motion.div>
                
                <motion.h3
                  className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {count.toFixed(1)}
                </motion.h3>
                
                <span className="text-4xl text-slate-400">kg CO₂</span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg shadow-emerald-500/50"
              />

              <p className="text-slate-300 text-lg">
                Batch ID: <span className="font-mono text-emerald-400">COFFEE-2026-001</span>
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-slate-400">Verified on Blockchain</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* History Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: History list */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-blue-400" />
              <h3 className="text-3xl font-bold text-white">Carbon History</h3>
            </div>

            <div className="space-y-4">
              {history.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">{entry.stage}</h4>
                    <span className={`text-2xl font-bold text-${entry.color}-400`}>
                      {entry.carbon} kg
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-mono">{entry.timestamp}</p>
                  
                  {/* Mini progress bar */}
                  <div className="mt-3 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${
                        entry.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                        entry.color === 'orange' ? 'from-orange-500 to-red-500' :
                        entry.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        'from-amber-500 to-yellow-500'
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(entry.carbon / targetValue) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Insights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-6 h-6 text-emerald-400" />
              <h3 className="text-3xl font-bold text-white">Key Insights</h3>
            </div>

            <div className="space-y-6">
              {/* Insight cards */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30"
              >
                <h4 className="text-lg font-bold text-emerald-400 mb-2">
                  Highest Impact: Transport
                </h4>
                <p className="text-slate-300">
                  Transport accounts for 41% of total emissions. Consider local sourcing or optimized routing.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30"
              >
                <h4 className="text-lg font-bold text-blue-400 mb-2">
                  Benchmark Comparison
                </h4>
                <p className="text-slate-300">
                  Your footprint is <span className="text-emerald-400 font-semibold">23% lower</span> than industry average (9.7 kg CO₂).
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30"
              >
                <h4 className="text-lg font-bold text-amber-400 mb-2">
                  Reduction Potential
                </h4>
                <p className="text-slate-300">
                  Switching to renewable energy in roasting could reduce emissions by an additional 0.8 kg CO₂.
                </p>
              </motion.div>

              {/* Certificate badge */}
              <motion.div
                whileHover={{ rotate: [0, -2, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-500/50 text-center"
              >
                <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">
                  Verified Low Carbon
                </h4>
                <p className="text-sm text-slate-400">
                  Blockchain Certificate #42069
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
