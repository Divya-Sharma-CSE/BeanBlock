import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useWeb3 } from './Web3Provider';
import { toast } from 'sonner';

export const CreateBatch: React.FC = () => {
  const { contract, isConnected } = useWeb3();
  const [batchId, setBatchId] = useState('');
  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdBatch, setCreatedBatch] = useState<string | null>(null);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!batchId || !origin) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call the smart contract:
      // const tx = await contract.createBatch(batchId, origin);
      // await tx.wait();
      
      setCreatedBatch(batchId);
      toast.success('Batch created successfully on blockchain!');
      
      // Reset form
      setTimeout(() => {
        setBatchId('');
        setOrigin('');
        setCreatedBatch(null);
      }, 3000);
    } catch (error: any) {
      console.error('Error creating batch:', error);
      toast.error(error.message || 'Failed to create batch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Create New Batch
          </h2>
          <p className="text-xl text-slate-400">
            Register a new product batch on the blockchain
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
            <form onSubmit={handleCreateBatch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="batchId" className="text-slate-300 text-lg">
                  Batch ID
                </Label>
                <Input
                  id="batchId"
                  type="text"
                  placeholder="e.g., COFFEE-2026-001"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 text-lg py-6"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin" className="text-slate-300 text-lg">
                  Origin Location
                </Label>
                <Input
                  id="origin"
                  type="text"
                  placeholder="e.g., Ethiopia, Yirgacheffe"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 text-lg py-6"
                  disabled={loading}
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={loading || !isConnected}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating on Blockchain...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Create Batch
                    </>
                  )}
                </Button>
              </motion.div>

              {!isConnected && (
                <p className="text-center text-amber-400 text-sm">
                  Please connect your wallet to create a batch
                </p>
              )}
            </form>

            {/* Success message */}
            {createdBatch && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-emerald-400 font-semibold">Batch Created!</p>
                  <p className="text-sm text-slate-400">ID: {createdBatch}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Immutable', desc: 'Stored on blockchain forever' },
            { title: 'Transparent', desc: 'Publicly verifiable data' },
            { title: 'Traceable', desc: 'Full supply chain history' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 text-center"
            >
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
