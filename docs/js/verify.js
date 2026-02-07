async function verify() {
  const id = Number(document.getElementById("verifyProductId").value);
  const contract = await getContract(false);

  const emission = await contract.getCarbonEmission(id);
  const complete = await contract.isProductComplete(id);

  document.getElementById("result").textContent =
    `Carbon: ${emission[0]} ${emission[1]}\nVerified: ${complete}`;
}
