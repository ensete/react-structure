import React from 'react';
import { useDispatch } from "react-redux";
import MetamaskService from "src/app/services/accounts/MetamaskService";
import ENV from "src/app/configs/env";
import { clearAccount, importAccount } from "src/app/actions/accountAction";
import { WALLET_TYPE } from "src/app/configs/constants";
import { fromNetworkIdToName, getWalletParams } from "src/app/utils/helpers";
import { modalService } from "src/app/components/Commons/modals/ModalListener";
import BasicModalContent from "src/app/components/Commons/modals/BasicModalContent";
import { setGlobalModal } from "src/app/actions/globalAction";

export default function MetamaskAccount(props: any) {
  const dispatch = useDispatch();

  async function connect() {
    dispatch(setGlobalModal('loading', true));

    const props = getWalletParams();
    const wallet = new MetamaskService(props);
    const address = await wallet.connect(openConnectErrorModal, openNetworkErrorModal);

    if (address) {
      wallet.getDisconnected(() => dispatch(clearAccount()));
      dispatch(importAccount(address, wallet, WALLET_TYPE.METAMASK));
      modalService.close();
    }

    dispatch(setGlobalModal('loading', false));
  }

  function openConnectErrorModal() {
    modalService.show(BasicModalContent, {
      title: "Error",
      content: <div>Cannot connect to Metamask. Please make sure you have Metamask installed.</div>
    });
  }

  function openNetworkErrorModal(currentNetworkId: number) {
    modalService.show(BasicModalContent, {
      title: "Error",
      content: (
        <div className="text-center">
          <p className="mb-2">Metamask should be on <b>{fromNetworkIdToName(ENV.NETWORK_ID)}</b>.</p>
          <p>Currently it is on <b>{fromNetworkIdToName(currentNetworkId)}</b> instead.</p>
        </div>
      )
    });
  }

  return (
    <div className={`account__item ${props.className}`} onClick={connect}>
      <div className="account__icon metamask"/>
      <div className="account__name">Metamask</div>
    </div>
  )
};
