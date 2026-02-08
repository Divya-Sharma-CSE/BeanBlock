async function getContract(write = false) {
  // Check if ethers is available
  if (typeof ethers === 'undefined') {
    console.error('ethers library is not loaded. Please check the page source.');
    alert("Error: ethers.js library failed to load. Please refresh the page.");
    throw new Error("ethers library not available");
  }

  if (!window.ethereum) {
    console.error("MetaMask not installed");
    alert("MetaMask not installed. Please install the MetaMask extension.");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = write ? await provider.getSigner() : provider;

    const response = await fetch("abi/TradeDocuments.json");
    if (!response.ok) {
      throw new Error(`Failed to load ABI: ${response.status} ${response.statusText}`);
    }
    const abi = await response.json();

    if (!CONTRACT_ADDRESS) {
      console.error("CONTRACT_ADDRESS is not defined in constants.js");
      alert("Error: Contract address not configured. Please check constants.js");
      throw new Error("CONTRACT_ADDRESS not defined");
    }

    return new ethers.Contract(
      CONTRACT_ADDRESS,
      abi.abi,
      signer
    );
  } catch (error) {
    console.error("Error in getContract:", error);
    alert("Failed to initialize contract: " + error.message);
    throw error;
  }
}

async function storeDocument(productId, docType, cid) {
  const contract = await getContract(true);
  const tx = await contract.storeDocument(productId, docType, cid);
  return await tx.wait();
}

async function setCarbonEmission(productId, emission) {
  const contract = await getContract(true);
  const tx = await contract.setCarbonEmission(productId, emission, "kgCO2e");
  return await tx.wait();
}
