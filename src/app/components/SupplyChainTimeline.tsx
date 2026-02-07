import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Flame, Truck, Coffee, ChevronRight } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  carbon: string;
  color: string;
}

const stages: Stage[] = [
  {
    id: 'farm',
    name: 'Farm',
    icon: <Sprout className="w-8 h-8" />,
    description: 'Coffee beans grown and harvested',
    carbon: '2.3 kg CO₂',
    color: 'emerald',
  },
  {
    id: 'roast',
    name: 'Roast',
    icon: <Flame className="w-8 h-8" />,
    description: 'Beans roasted to perfection',
    carbon: '1.7 kg CO₂',
    color: 'orange',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: <Truck className="w-8 h-8" />,
    description: 'Shipped to destination',
    carbon: '3.1 kg CO₂',
    color: 'blue',
  },
  {
    id: 'cup',
    name: 'Cup',
    icon: <Coffee className="w-8 h-8" />,
    description: 'Ready to enjoy',
    carbon: '0.4 kg CO₂',
    color: 'amber',
  },
];

export const SupplyChainTimeline: React.FC = () => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            The Journey
          </h2>
          <p className="text-xl text-slate-400">
            Every stage tracked. Every emission verified.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-amber-500/20 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredStage(stage.id)}
                onHoverEnd={() => setHoveredStage(null)}
                className="relative"
              >
                {/* Connector arrow (desktop only) */}
                {index < stages.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 z-10">
                    <ChevronRight className="w-8 h-8 text-slate-600" />
                  </div>
                )}

                <motion.div
                  className={`relative p-8 rounded-2xl border-2 transition-all ${
                    hoveredStage === stage.id
                      ? stage.color === 'emerald' ? 'border-emerald-500/50 bg-emerald-500/5' :
                        stage.color === 'orange' ? 'border-orange-500/50 bg-orange-500/5' :
                        stage.color === 'blue' ? 'border-blue-500/50 bg-blue-500/5' :
                        'border-amber-500/50 bg-amber-500/5'
                      : 'border-slate-700/50 bg-slate-800/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -10 }}
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                      stage.color === 'emerald' ? 'from-emerald-500 to-teal-600' :
                      stage.color === 'orange' ? 'from-orange-500 to-red-600' :
                      stage.color === 'blue' ? 'from-blue-500 to-cyan-600' :
                      'from-amber-500 to-yellow-600'
                    } flex items-center justify-center text-white mb-6 mx-auto shadow-lg`}
                    animate={hoveredStage === stage.id ? { rotate: [0, -5, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {stage.icon}
                  </motion.div>

                  {/* Stage name */}
                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {stage.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-center mb-4">
                    {stage.description}
                  </p>

                  {/* Carbon footprint */}
                  <motion.div
                    className={`text-center py-2 px-4 rounded-lg ${
                      stage.color === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/30' :
                      stage.color === 'orange' ? 'bg-orange-500/10 border border-orange-500/30' :
                      stage.color === 'blue' ? 'bg-blue-500/10 border border-blue-500/30' :
                      'bg-amber-500/10 border border-amber-500/30'
                    }`}
                    animate={hoveredStage === stage.id ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`font-bold ${
                      stage.color === 'emerald' ? 'text-emerald-400' :
                      stage.color === 'orange' ? 'text-orange-400' :
                      stage.color === 'blue' ? 'text-blue-400' :
                      'text-amber-400'
                    }`}>
                      {stage.carbon}
                    </span>
                  </motion.div>

                  {/* Pulse effect on hover */}
                  {hoveredStage === stage.id && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${
                        stage.color === 'emerald' ? 'border-emerald-500' :
                        stage.color === 'orange' ? 'border-orange-500' :
                        stage.color === 'blue' ? 'border-blue-500' :
                        'border-amber-500'
                      }`}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Total carbon display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <p className="text-slate-400 mb-2 text-lg">Total Verified Carbon Footprint</p>
              <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                7.5 kg CO₂
              </p>
              <p className="text-slate-500 mt-3">per product batch</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};