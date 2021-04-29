import Web3 from "web3";
import ENV from "src/app/configs/env";
import { TX_STATUS } from "src/app/configs/constants";
import { BroadcastedTx } from "src/app/types/tx";
const ERC20ABI = require("src/app/configs/ABIs/ERC20.json");

const web3Provider = new Web3(new Web3.providers.HttpProvider(ENV.NODE.URL));

export async function fetchETHBalance(address: string): Promise<string> {
  return await web3Provider.eth.getBalance(address);
}

export async function fetchTokenBalance(address: string, tokenAddress: string): Promise<string> {
  const tokenContract = new web3Provider.eth.Contract(ERC20ABI, tokenAddress);
  return await tokenContract.methods.balanceOf(address).call();
}

export async function fetchTokenAllowance(address: string, tokenAddress: string, spender: string): Promise<number> {
  const tokenContract = new web3Provider.eth.Contract(ERC20ABI, tokenAddress);
  const allowance = await tokenContract.methods.allowance(address, spender).call();

  return +allowance;
}

export async function updateTxsStatus(txs: BroadcastedTx[]) {
  try {
    for (let i = 0; i < txs.length; i++) {
      const tx = txs[i];

      if (tx.status === TX_STATUS.PENDING) {
        const status = await _checkTxMined(tx.hash, '');
        switch (status) {
          case true:
            tx.status = TX_STATUS.SUCCESS;
            if (tx.onSuccess) tx.onSuccess();
            break;
          case false:
            tx.status = TX_STATUS.FAILED;
            if (tx.onFailed) tx.onFailed();
            break;
          default:
            tx.status = TX_STATUS.PENDING;
            break;
        }

        if (tx.status !== TX_STATUS.PENDING && tx.onDone) {
          tx.onDone();
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  return txs;
}

async function _checkTxMined(txHash: string, topic: string): Promise<boolean | null> {
  const receipt = await web3Provider.eth.getTransactionReceipt(txHash);

  if (receipt !== null) {
    if (topic === '') {
      return receipt.status
    }
    const logs = receipt.logs;
    const blockNumber = receipt.blockNumber;

    if (!blockNumber) {
      return null
    }
    if (!logs.length) {
      return false
    }

    for (let i = 0; i < logs.length; ++i) {
      if (logs[i].topics[0].toLowerCase() === topic.toLowerCase()) {
        return true;
      }
    }
  }

  return null
}