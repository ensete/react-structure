import { WALLET_TYPE } from "src/app/configs/constants";
import { detectWeb3Object } from "src/app/utils/helpers";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";

export default class MetamaskService extends BaseWalletService {
  constructor(props?: any) {
    super(props);

    const { web3, ethereum } = detectWeb3Object();

    this.ethereum = ethereum;
    this.web3 = web3;
  }

  subscribeToDisconnect = (clearAccount: any, importAccount: any, wallet: any) => {
    this.getDisconnected(clearAccount, importAccount, wallet);
  };

  getWalletType = () => {
    return WALLET_TYPE.METAMASK;
  }
}