import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { QrCode, Search, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import QRCode from 'qrcode';
import { toast } from 'sonner';

export const QRCodeSection: React.FC = () => {
  const [batchId, setBatchId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!batchId) {
      toast.error('Please enter a batch ID');
      return;
    }

    try {
      // Generate URL that would link to the carbon dashboard
      const dashboardUrl = `${window.location.origin}?batch=${batchId}`;
      
      // Generate QR code
      const qrDataUrl = await QRCode.toDataURL(dashboardUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#10b981',
          light: '#0f172a',
        },
      });
      
      setQrCodeUrl(qrDataUrl);
      toast.success('QR Code generated successfully!');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `carbon-footprint-${batchId}.png`;
    link.href = qrCodeUrl;
    link.click();
    toast.success('QR Code downloaded!');
  };

  const lookupBatch = () => {
    if (!lookupId) {
      toast.error('Please enter a batch ID');
      return;
    }

    // Mock lookup result
    const mockResult = {
      batchId: lookupId,
      origin: 'Ethiopia, Yirgacheffe',
      totalCarbon: 7.5,
      stages: 4,
      verified: true,
      timestamp: '2026-02-07 08:15',
    };

    setLookupResult(mockResult);
    toast.success('Batch found!');
  };

  return (
    <section className="relative py-32 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 rounded-2xl bg-cyan-500/10 mb-6">
            <QrCode className="w-12 h-12 text-cyan-400" />
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            QR Code Access
          </h2>
          <p className="text-xl text-slate-400">
            Scan to instantly view carbon footprint data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Generate QR Code */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-white mb-6">Generate QR Code</h3>
              
              <div className="space-y-4 mb-6">
                <Input
                  type="text"
                  placeholder="Enter Batch ID"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 text-lg py-6"
                />
                
                <Button
                  onClick={generateQRCode}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg font-semibold"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Generate QR Code
                </Button>
              </div>

              {qrCodeUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-2xl bg-slate-950/50 border border-cyan-500/30 flex justify-center">
                    <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                  </div>
                  
                  <Button
                    onClick={downloadQRCode}
                    variant="outline"
                    className="w-full border-slate-600 text-white hover:bg-slate-800"
                  >
                    Download QR Code
                  </Button>

                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                    <p className="text-sm text-slate-300 text-center">
                      Scan this QR code to view the carbon footprint dashboard for batch{' '}
                      <span className="font-mono text-cyan-400">{batchId}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Lookup by ID */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-white mb-6">Product Lookup</h3>
              
              <div className="space-y-4 mb-6">
                <Input
                  type="text"
                  placeholder="Enter Batch ID to lookup"
                  value={lookupId}
                  onChange={(e) => setLookupId(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 text-lg py-6"
                />
                
                <Button
                  onClick={lookupBatch}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 text-lg font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Batch
                </Button>
              </div>

              {lookupResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-2xl bg-slate-950/50 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-white">Batch Details</h4>
                      {lookupResult.verified ? (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-400">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Not Verified</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Batch ID</span>
                        <span className="text-white font-mono">{lookupResult.batchId}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Origin</span>
                        <span className="text-white">{lookupResult.origin}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Total Carbon</span>
                        <span className="text-emerald-400 font-bold">{lookupResult.totalCarbon} kg CO₂</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Supply Stages</span>
                        <span className="text-white">{lookupResult.stages}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400">Last Updated</span>
                        <span className="text-white text-sm">{lookupResult.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <p className="text-sm text-slate-300 text-center">
                      All data is stored immutably on the blockchain and publicly verifiable
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Use case scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'On Product Packaging',
              desc: 'Print QR code directly on coffee bags',
              icon: '📦',
            },
            {
              title: 'In Retail Stores',
              desc: 'Display codes at point of sale',
              icon: '🏪',
            },
            {
              title: 'Marketing Materials',
              desc: 'Share on social media and ads',
              icon: '📱',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
