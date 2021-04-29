import { WALLET_TYPE } from "src/app/configs/constants";
import MetamaskService from "src/app/services/accounts/MetamaskService";

export default class DappService extends MetamaskService {
  subscribeToDisconnect = () => {
    return false
  };

  getWalletType = () => {
    return WALLET_TYPE.DAPP;
  }
}