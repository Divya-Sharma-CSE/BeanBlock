function initializeUploadHandler() {
  // Check if ethers is available
  if (typeof ethers === 'undefined') {
    console.warn('ethers library not ready, retrying in 100ms...');
    setTimeout(initializeUploadHandler, 100);
    return;
  }

  // Check if required functions exist
  if (typeof uploadToIPFS === 'undefined' || 
      typeof storeDocument === 'undefined' || 
      typeof setCarbonEmission === 'undefined') {
    console.warn('Required functions not loaded yet, retrying...');
    setTimeout(initializeUploadHandler, 100);
    return;
  }

  const uploadBtn = document.getElementById("uploadBtn");
  if (!uploadBtn) {
    console.warn('Upload button not found');
    return;
  }

  uploadBtn.onclick = async () => {
    const productId = document.getElementById("productId")?.value;
    const emission = document.getElementById("emission")?.value;
    const docType = document.getElementById("docType")?.value;
    const file = document.getElementById("fileInput")?.files[0];
    const status = document.getElementById("status");

    if (!productId || !emission || !docType) {
      if (status) status.textContent = "❌ Please fill in all fields";
      return;
    }

    if (!file) {
      if (status) status.textContent = "❌ Please upload a PDF";
      return;
    }

    try {
      if (status) status.textContent = "📤 Uploading to IPFS...";
      const cid = await uploadToIPFS(file);

      if (status) status.textContent = `📌 CID generated:\n${cid}\n\n⛓️ Storing on blockchain...`;
      await storeDocument(Number(productId), Number(docType), cid);

      if (status) status.textContent += "\n✅ Document stored.\n💨 Saving carbon emission...";
      await setCarbonEmission(Number(productId), Number(emission));

      if (status) status.textContent += "\n✅ Product data verified on-chain!";
    } catch (err) {
      console.error("Upload error:", err);
      if (status) status.textContent = "❌ Error: " + (err.message || String(err));
    }
  };

  console.log('Upload handler initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUploadHandler);
} else {
  initializeUploadHandler();
}
