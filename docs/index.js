
  const connectButton = document.getElementById("connectWalletBtn");

  async function connectMetaMask() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install MetaMask to continue.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAddress = accounts[0];
      console.log("Connected wallet:", walletAddress);

      // Optional UI update
      connectButton.innerText =
        walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
      connectButton.disabled = true;

    } catch (error) {
      console.error("User rejected connection", error);
      alert("Connection request rejected.");
    }
  }

  connectButton.addEventListener("click", connectMetaMask);

