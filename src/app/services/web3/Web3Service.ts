import Web3 from "web3";
import ENV from "src/app/configs/env";
import { ABI, ACTIONS, DEFAULT_GAS_LIMIT } from "src/app/configs/constants";
import { getBiggestNumber } from "../../utils/helpers";

export default class Web3Service {
  web3: any;
  erc20Contract: any;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(ENV.NODE.URL));
    this.erc20Contract = new this.web3.eth.Contract(ABI.ERC20);
  }

  fetchETHBalance = (address: string) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(address).then((balance: string) => {
        resolve(balance)
      }).catch((err: any) => {
        reject(err)
      })
    })
  };

  fetchTokenBalance = (address: string, tokenAddress: string) => {
    let tokenContract = this.erc20Contract;
    tokenContract.options.address = tokenAddress;

    return new Promise((resolve, reject) => {
      const data = tokenContract.methods.balanceOf(address).encodeABI();

      this.web3.eth.call({
        to: tokenAddress,
        data: data
      }).then((result: string) => {
        const tokenBalance = this.web3.eth.abi.decodeParameters(['uint256'], result);
        resolve(tokenBalance[0]);
      }).catch((err: any) => {
        reject(err);
      })
    })
  };

  fetchTokenAllowance = (address: string, tokenAddress: string, spender: string) => {
    let tokenContract = this.erc20Contract;
    tokenContract.options.address = tokenAddress;

    const data = tokenContract.methods.allowance(address, spender).encodeABI();

    return new Promise((resolve, reject) => {
      this.web3.eth.call({
        to: tokenAddress,
        data: data
      }).then((result: string) => {
        const allowance = this.web3.eth.abi.decodeParameters(['uint256'], result);
        resolve(allowance[0])
      }).catch((err: any) => {
        reject(err)
      })
    })
  };

  estimatedGasByType = async (txType: number, params: any) => {
    let estimatedGas: any;

    try {
      const txObject = this.getTxObjectByType(txType, params);
      estimatedGas = await this.estimateGas(txObject);
      estimatedGas = Math.round(estimatedGas * 1.3);

      if (txType === ACTIONS.APPROVE && params.isApproveToMax && estimatedGas < DEFAULT_GAS_LIMIT.APPROVE_MAX) {
        estimatedGas = DEFAULT_GAS_LIMIT.APPROVE_MAX;
      }
    } catch(e) {
      estimatedGas = this.getDefaultGasLimitByType(txType);
    }

    return estimatedGas;
  }

  estimateGas = (txObject: any) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.estimateGas(txObject).then((result: number) => {
        resolve(result)
      }).catch((err: any) => {
        reject(err)
      })
    })
  };

  checkTxMined = async (txHash: string, topic: string) => {
    const receipt = await this.web3.eth.getTransactionReceipt(txHash);

    if (receipt !== null) {
      if (topic === undefined) {
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

  getTxObject = (contractAddress: string, methodData: string, address: string, nonce: any, gasPrice: any, gas: any) => {
    let txObject = {
      from: address,
      to: contractAddress,
      value: '0x0',
      data: methodData,
      nonce: undefined,
      gasPrice: undefined,
      gas: undefined
    };

    if (nonce !== null) txObject.nonce = this.web3.utils.toHex(nonce);
    if (gasPrice !== null) txObject.gasPrice = this.web3.utils.toHex(this.web3.utils.toWei(gasPrice));
    if (gas !== null) txObject.gas = this.web3.utils.toHex(gas);

    return txObject;
  };

  getApproveTxObject = (
    address: string, isApproveToMax = true, nonce = null, gasPrice = null, gas = null,
    tokenAddress = ENV.KNC_ADDRESS, delegator = ENV.CONTRACTS.STAKING
  ) => {
    const allowanceAmount = isApproveToMax ? getBiggestNumber() : 0;
    const tokenContract = this.erc20Contract;
    tokenContract.options.address = tokenAddress;

    const approveData = tokenContract.methods.approve(delegator, allowanceAmount).encodeABI();

    return this.getTxObject(tokenAddress, approveData, address, nonce, gasPrice, gas);
  };

  getDefaultGasLimitByType = (txType: number) => {
    let defaultGas;

    if (txType === ACTIONS.APPROVE) {
      defaultGas = DEFAULT_GAS_LIMIT.APPROVE;
    }

    return defaultGas;
  }

  getTxObjectByType = (txType: number, params: any) => {
    let txObject = null;

    if (txType === ACTIONS.APPROVE) {
      txObject = this.getApproveTxObject(params.address, params.isApproveToMax);
    }

    return txObject;
  }
}
