export async function uploadToIPFS(file) {
  if (!file) {
    throw new Error("File is required for IPFS upload");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Pinata upload failed: ${errorText}`);
    }

    const result = await response.json();

    // IMPORTANT:
    // Pinata / IPFS automatically generates the CID.
    // We DO NOT hash the file manually.
    return result.IpfsHash;

  } catch (error) {
    console.error("IPFS upload error:", error);
    throw error;
  }
}
