import Web3 from "web3";
import ENV from "src/app/configs/env";
const ERC20ABI = require("src/app/configs/ABIs/ERC20.json");

const web3Provider = new Web3(new Web3.providers.HttpProvider(ENV.NODE.URL));

export async function fetchETHBalance(address: string): Promise<string> {
  return await web3Provider.eth.getBalance(address);
}

export async function fetchTokenBalance(address: string, tokenAddress: string): Promise<string> {
  const tokenContract = new web3Provider.eth.Contract(ERC20ABI, tokenAddress);
  return await tokenContract.methods.balanceOf(address).call();
}