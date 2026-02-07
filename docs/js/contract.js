async function getContract(write = false) {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = write ? await provider.getSigner() : provider;

  const abi = await fetch("abi/TradeDocuments.json").then(r => r.json());

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    abi.abi,
    signer
  );
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
