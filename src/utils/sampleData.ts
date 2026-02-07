// Sample data generator for testing the application

export const sampleBatches = [
  {
    batchId: 'COFFEE-2026-001',
    origin: 'Ethiopia, Yirgacheffe',
    totalCarbon: 7.5,
    stages: [
      { stage: 'Farm', carbon: 2.3, timestamp: '2026-02-05 09:30' },
      { stage: 'Roast', carbon: 1.7, timestamp: '2026-02-06 14:20' },
      { stage: 'Transport', carbon: 3.1, timestamp: '2026-02-06 18:45' },
      { stage: 'Cup', carbon: 0.4, timestamp: '2026-02-07 08:15' },
    ],
  },
  {
    batchId: 'COFFEE-2026-002',
    origin: 'Colombia, Huila',
    totalCarbon: 8.2,
    stages: [
      { stage: 'Farm', carbon: 2.8, timestamp: '2026-02-04 10:15' },
      { stage: 'Roast', carbon: 1.9, timestamp: '2026-02-05 15:30' },
      { stage: 'Transport', carbon: 3.0, timestamp: '2026-02-06 09:20' },
      { stage: 'Cup', carbon: 0.5, timestamp: '2026-02-07 11:45' },
    ],
  },
  {
    batchId: 'COFFEE-2026-003',
    origin: 'Brazil, Minas Gerais',
    totalCarbon: 6.8,
    stages: [
      { stage: 'Farm', carbon: 2.1, timestamp: '2026-02-03 08:00' },
      { stage: 'Roast', carbon: 1.5, timestamp: '2026-02-04 13:15' },
      { stage: 'Transport', carbon: 2.8, timestamp: '2026-02-05 16:30' },
      { stage: 'Cup', carbon: 0.4, timestamp: '2026-02-06 10:20' },
    ],
  },
];

export const coffeeOrigins = [
  'Ethiopia, Yirgacheffe',
  'Colombia, Huila',
  'Brazil, Minas Gerais',
  'Kenya, Nyeri',
  'Guatemala, Antigua',
  'Costa Rica, Tarrazu',
  'Indonesia, Sumatra',
  'Vietnam, Central Highlands',
  'Peru, Cusco',
  'Honduras, Copán',
];

export const carbonRanges = {
  farm: { min: 1.8, max: 3.2 },
  roast: { min: 1.2, max: 2.3 },
  transport: { min: 2.5, max: 4.0 },
  cup: { min: 0.3, max: 0.6 },
};

// Generate random batch ID
export const generateSampleBatchId = (): string => {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 999) + 1;
  return `COFFEE-${year}-${num.toString().padStart(3, '0')}`;
};

// Generate random origin
export const generateSampleOrigin = (): string => {
  return coffeeOrigins[Math.floor(Math.random() * coffeeOrigins.length)];
};

// Generate random carbon value within realistic range
export const generateSampleCarbon = (stage: keyof typeof carbonRanges): number => {
  const range = carbonRanges[stage];
  return Math.round((Math.random() * (range.max - range.min) + range.min) * 10) / 10;
};

// Generate complete sample batch
export const generateCompleteSampleBatch = () => {
  const farm = generateSampleCarbon('farm');
  const roast = generateSampleCarbon('roast');
  const transport = generateSampleCarbon('transport');
  const cup = generateSampleCarbon('cup');
  
  return {
    batchId: generateSampleBatchId(),
    origin: generateSampleOrigin(),
    totalCarbon: Math.round((farm + roast + transport + cup) * 10) / 10,
    stages: [
      { stage: 'Farm', carbon: farm, timestamp: generateTimestamp(4) },
      { stage: 'Roast', carbon: roast, timestamp: generateTimestamp(3) },
      { stage: 'Transport', carbon: transport, timestamp: generateTimestamp(2) },
      { stage: 'Cup', carbon: cup, timestamp: generateTimestamp(1) },
    ],
  };
};

// Generate timestamp (days ago)
const generateTimestamp = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// Generate multiple sample batches
export const generateMultipleSampleBatches = (count: number) => {
  return Array.from({ length: count }, () => generateCompleteSampleBatch());
};

// Sample insights based on carbon footprint
export const generateInsights = (totalCarbon: number) => {
  const benchmark = 9.7; // Industry average
  const reduction = Math.round(((benchmark - totalCarbon) / benchmark) * 100);
  
  const insights = [];
  
  if (totalCarbon < 8.0) {
    insights.push({
      type: 'success',
      title: 'Low Carbon Achievement!',
      message: `Your footprint is ${Math.abs(reduction)}% lower than industry average.`,
      color: 'emerald',
    });
  } else if (totalCarbon > 12.0) {
    insights.push({
      type: 'warning',
      title: 'High Carbon Alert',
      message: `Your footprint is ${Math.abs(reduction)}% higher than industry average.`,
      color: 'red',
    });
  } else {
    insights.push({
      type: 'info',
      title: 'Near Industry Average',
      message: `Your footprint is close to the industry benchmark of ${benchmark} kg CO₂.`,
      color: 'blue',
    });
  }
  
  return insights;
};

// Mockup of blockchain transaction response
export const mockBlockchainTransaction = async (actionType: string): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate transaction hash
  const txHash = '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  return {
    success: true,
    transactionHash: txHash,
    blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
    gasUsed: Math.floor(Math.random() * 50000) + 21000,
    timestamp: new Date().toISOString(),
    actionType,
  };
};

// Example usage in components:
/*
import { generateCompleteSampleBatch, mockBlockchainTransaction } from '../utils/sampleData';

// Generate test data
const sampleBatch = generateCompleteSampleBatch();
console.log(sampleBatch);

// Simulate blockchain call
const result = await mockBlockchainTransaction('createBatch');
console.log(result);
*/
