import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Loader2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useWeb3 } from './Web3Provider';
import { toast } from 'sonner';

const stages = ['Farm', 'Roast', 'Transport', 'Cup'];

export const AddCarbonEntry: React.FC = () => {
  const { contract, isConnected } = useWeb3();
  const [batchId, setBatchId] = useState('');
  const [stage, setStage] = useState('');
  const [carbonAmount, setCarbonAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!batchId || !stage || !carbonAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation:
      // const tx = await contract.addCarbonEntry(batchId, stage, carbonAmount, new Date().toISOString());
      // await tx.wait();
      
      toast.success(`Carbon entry added for ${stage} stage!`);
      
      // Reset form
      setBatchId('');
      setStage('');
      setCarbonAmount('');
    } catch (error: any) {
      console.error('Error adding entry:', error);
      toast.error(error.message || 'Failed to add carbon entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 rounded-2xl bg-emerald-500/10 mb-6">
            <Leaf className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            Add Carbon Data
          </h2>
          <p className="text-xl text-slate-400">
            Record emissions for each supply chain stage
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
            <form onSubmit={handleAddEntry} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="batchIdEntry" className="text-slate-300 text-lg">
                  Batch ID
                </Label>
                <Input
                  id="batchIdEntry"
                  type="text"
                  placeholder="e.g., COFFEE-2026-001"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 text-lg py-6"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stage" className="text-slate-300 text-lg">
                  Supply Chain Stage
                </Label>
                <Select value={stage} onValueChange={setStage} disabled={loading}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white text-lg py-6">
                    <SelectValue placeholder="Select a stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {stages.map((s) => (
                      <SelectItem key={s} value={s} className="text-white">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carbon" className="text-slate-300 text-lg">
                  Carbon Amount (kg CO₂)
                </Label>
                <Input
                  id="carbon"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 2.5"
                  value={carbonAmount}
                  onChange={(e) => setCarbonAmount(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 text-lg py-6"
                  disabled={loading}
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={loading || !isConnected}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg shadow-emerald-500/25"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Adding to Blockchain...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Carbon Entry
                    </>
                  )}
                </Button>
              </motion.div>

              {!isConnected && (
                <p className="text-center text-amber-400 text-sm">
                  Please connect your wallet to add carbon data
                </p>
              )}
            </form>
          </div>
        </motion.div>

        {/* Visual representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Why Track Carbon at Each Stage?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">1</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Identify Hotspots</h4>
                <p className="text-slate-400 text-sm">
                  Pinpoint which stages contribute most to emissions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">2</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Build Trust</h4>
                <p className="text-slate-400 text-sm">
                  Transparent data verified on blockchain
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">3</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Optimize Operations</h4>
                <p className="text-slate-400 text-sm">
                  Data-driven decisions to reduce footprint
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">4</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Consumer Choice</h4>
                <p className="text-slate-400 text-sm">
                  Empower eco-conscious purchasing decisions
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
