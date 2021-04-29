import Web3 from "web3";
import WalletLink from 'walletlink';
import ENV from "src/app/configs/env";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";
import { WALLET_TYPE } from "src/app/configs/constants";

export default class WalletLinkService extends BaseWalletService {
  walletLink: WalletLink;

  constructor(props?: any) {
    super(props);

    const walletLink = new WalletLink({
      appName: 'ReactStructure',
      appLogoUrl: ''
    });

    this.ethereum = walletLink.makeWeb3Provider(ENV.NODE.URL, ENV.NETWORK_ID);
    this.web3 = new Web3(this.ethereum);
    this.walletLink = walletLink;
  }

  clearSession = () => {
    this.walletLink.disconnect();
  };

  getWalletType = () => {
    return WALLET_TYPE.WALLET_LINK;
  }
}
