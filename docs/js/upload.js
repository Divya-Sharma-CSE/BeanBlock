document.getElementById("uploadBtn").onclick = async () => {
  const productId = Number(document.getElementById("productId").value);
  const emission = Number(document.getElementById("emission").value);
  const docType = Number(document.getElementById("docType").value);
  const file = document.getElementById("fileInput").files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.textContent = "Please upload a PDF";
    return;
  }

  try {
    status.textContent = "Uploading to IPFS...";
    const cid = await uploadToIPFS(file);

    status.textContent = `CID generated:\n${cid}\n\nStoring on blockchain...`;
    await storeDocument(productId, docType, cid);

    status.textContent += "\nDocument stored.\nSaving carbon emission...";
    await setCarbonEmission(productId, emission);

    status.textContent += "\n✅ Product data verified on-chain";
  } catch (err) {
    status.textContent = "❌ Error: " + err.message;
  }
};
