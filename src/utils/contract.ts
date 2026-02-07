"use client";

import { ethers } from "ethers";
import abi from "./abi.json";

/* Your deployed contract address */
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function getContract() {
  try {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return null;
    }

    // Request wallet if not connected
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const network = await provider.getNetwork();

    console.log("Connected to network:", network.name);

    return new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    );

  } catch (error) {
    console.error("Contract connection failed:", error);
    return null;
  }
}