document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");

  btn.addEventListener("click", async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      btn.textContent =
        accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4);

    } catch (err) {
      console.error(err);
      alert("User rejected connection");
    }
  });
});
