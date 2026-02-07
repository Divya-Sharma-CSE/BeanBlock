import { BrowserProvider, Contract } from "ethers";
import * as TradeDocumentsABI from "../contracts/TradeDocuments.json";

const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS";

async function getSigner() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new BrowserProvider(window.ethereum as any);
  await provider.send("eth_requestAccounts", []);

  return await provider.getSigner();
}

async function getContract() {
  const signer = await getSigner();

  return new Contract(
  CONTRACT_ADDRESS,
  (TradeDocumentsABI as any).default ?? TradeDocumentsABI,
  signer
);
}

export async function storeDocument(
  productId: number,
  docType: number,
  cid: string
) {
  const contract = await getContract();

  const tx = await contract.storeDocument(
    productId,
    docType,
    cid
  );

  return await tx.wait();
}

export async function getDocument(
  productId: number,
  docType: number
): Promise<string> {
  const contract = await getContract();

  return await contract.getDocument(productId, docType);
}

export async function isProductComplete(
  productId: number
): Promise<boolean> {
  const contract = await getContract();

  return await contract.isProductComplete(productId);
}