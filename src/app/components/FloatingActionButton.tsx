import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, PackagePlus, Leaf, QrCode, BarChart3 } from 'lucide-react';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: PackagePlus, label: 'Create Batch', color: 'blue', action: () => window.scrollTo({ top: document.querySelector('#create')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' }) },
    { icon: Leaf, label: 'Add Carbon', color: 'emerald', action: () => window.scrollTo({ top: document.querySelector('#carbon')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' }) },
    { icon: BarChart3, label: 'Dashboard', color: 'teal', action: () => window.scrollTo({ top: document.querySelector('#dashboard')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' }) },
    { icon: QrCode, label: 'QR Code', color: 'cyan', action: () => window.scrollTo({ top: document.querySelector('#qr')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' }) },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((item, index) => (
              <motion.button
                key={index}
                onClick={item.action}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-3 rounded-full bg-slate-800 border border-slate-600 hover:border-emerald-500 text-white shadow-lg backdrop-blur-sm group"
              >
                <item.icon className={`w-5 h-5 ${
                  item.color === 'blue' ? 'text-blue-400' :
                  item.color === 'emerald' ? 'text-emerald-400' :
                  item.color === 'teal' ? 'text-teal-400' :
                  'text-cyan-400'
                }`} />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
        </motion.div>
      </motion.button>
    </div>
  );
};