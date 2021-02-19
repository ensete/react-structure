import ENV from "src/app/configs/env";
import { WALLET_TYPES } from "src/app/configs/constants";
import MetamaskService from "src/app/services/accounts/MetamaskService";
import WalletConnectService from "src/app/services/accounts/WalletConnectService";
import DappService from "src/app/services/accounts/DappService";
import Web3 from "web3";

export function getAnimatedJsonOptions(json: any) {
  return {
    loop: true,
    autoplay: true,
    animationData: json.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
}

export function getWalletParams(address: string | null) {
  return {
    nodeUrl: ENV.NODE.URL,
    nodeTimeout: ENV.NODE.CONNECTION_TIMEOUT,
    networkId: ENV.NETWORK_ID,
    chainName: ENV.CHAIN_NAME,
    address: address,
  }
}

export function detectWeb3Object() {
  let web3;
  const ethereum = window.ethereum;

  if (ethereum) {
    web3 = new Web3(ethereum as any);
  } else {
    const provider = new Web3.providers.HttpProvider(ENV.NODE.URL)
    web3 = new Web3(provider);
  }

  return {web3, ethereum}
}

export function getWalletByType(address: string, type: string) {
  let wallet = null;
  const props = getWalletParams(address);

  if (type === WALLET_TYPES.METAMASK) {
    wallet = new MetamaskService(props);
  } else if (type === WALLET_TYPES.WALLET_CONNECT) {
    wallet = new WalletConnectService(props);
  } else if (type === WALLET_TYPES.DAPP) {
    wallet = new DappService(props);
  }

  return wallet;
}

export function fromNetworkIdToName(networkId: number) {
  let networkName = 'Unknown Network';

  if (networkId === 1) {
    networkName = 'Mainnet';
  } else if (networkId === 3) {
    networkName = 'Ropsten';
  } else if (networkId === 4) {
    networkName = 'Rinkeby';
  } else if (networkId === 5) {
    networkName = 'Goerli Test';
  } else if (networkId === 42) {
    networkName = 'Kovan';
  }

  return networkName;
}

export function getBiggestNumber() {
  return '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
}

export function checkIsMetamask() {
  let isMetamask = false;

  if (window.ethereum && window.ethereum.isMetaMask) {
    isMetamask = true;
  }

  return isMetamask;
}