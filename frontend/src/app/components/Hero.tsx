import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Shield, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useWeb3 } from './Web3Provider';

export const Hero: React.FC = () => {
  const { connectWallet, disconnectWallet, isConnected, account } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Leaf className="w-12 h-12 text-emerald-500/30" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <Shield className="w-16 h-16 text-blue-500/30" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <Globe className="w-14 h-14 text-teal-500/30" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              Web3 × Sustainability
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            Carbon Verified
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto">
            Track every gram of CO₂ from{' '}
            <span className="text-emerald-400 font-semibold">farm to cup</span>
          </p>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Blockchain-powered transparency for verifiable carbon footprints.
            Every product tells its sustainability story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!isConnected ? (
              <Button
                onClick={connectWallet}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-emerald-500/25"
              >
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="px-4 py-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-emerald-400 font-mono">
                  {formatAddress(account!)}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="border-slate-700 hover:bg-slate-800"
                >
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { label: 'Batches Tracked', value: '1,247' },
            { label: 'CO₂ Verified', value: '34.2T' },
            { label: 'Supply Stages', value: '4' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
