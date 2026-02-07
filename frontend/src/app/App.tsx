import React from 'react';
import { Web3Provider } from './components/Web3Provider';
import { CursorFollower } from './components/CursorFollower';
import { Navbar } from './components/Navbar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Hero } from './components/Hero';
import { SupplyChainTimeline } from './components/SupplyChainTimeline';
import { CreateBatch } from './components/CreateBatch';
import { AddCarbonEntry } from './components/AddCarbonEntry';
import { CarbonDashboard } from './components/CarbonDashboard';
import { QRCodeSection } from './components/QRCodeSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Web3Provider>
      <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
        {/* Cursor follower effect */}
        <CursorFollower />

        {/* Navigation */}
        <Navbar />

        {/* Floating Action Button */}
        <FloatingActionButton />

        {/* Main content */}
        <div className="relative z-10">
          <Hero />
          <div id="timeline">
            <SupplyChainTimeline />
          </div>
          <div id="create">
            <CreateBatch />
          </div>
          <div id="carbon">
            <AddCarbonEntry />
          </div>
          <div id="dashboard">
            <CarbonDashboard />
          </div>
          <div id="qr">
            <QRCodeSection />
          </div>
          <Footer />
        </div>

        {/* Toast notifications */}
        <Toaster position="top-right" />
      </div>
    </Web3Provider>
  );
}