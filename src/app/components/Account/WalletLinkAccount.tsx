import React from 'react';
import { useDispatch } from "react-redux";
import { importAccount } from "src/app/actions/accountAction";
import { WALLET_TYPE } from "src/app/configs/constants";
import WalletLinkService from "src/app/services/accounts/WalletLinkService";
import { modalService } from "src/app/components/Commons/Modals/ModalListener";
import BasicModalContent from "src/app/components/Commons/Modals/BasicModalContent";
import { getWalletParams } from "src/app/utils/helpers";

export default function WalletLinkAccount(props: any) {
  const dispatch = useDispatch();

  async function connect() {
    const props = getWalletParams();
    const wallet = new WalletLinkService(props);
    const address = await wallet.connect(openEthereumErrorModal);

    if (address) {
      dispatch(importAccount(address, wallet, WALLET_TYPE.WALLET_LINK));
      modalService.close();
    }
  }

  function openEthereumErrorModal() {
    modalService.show(BasicModalContent, {
      title: "Error",
      content: <div>Cannot connect to Coinbase</div>
    });
  }

  return (
    <div className={`account__item ${props.className}`} onClick={connect}>
      <div className="account__icon wallet-link"/>
      <div className="account__name">Coinbase</div>
    </div>
  )
};
