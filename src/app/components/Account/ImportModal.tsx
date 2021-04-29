import React from "react";
import MetamaskAccount from "src/app/components/Account/MetamaskAccount";
import WalletLinkAccount from "src/app/components/Account/WalletLinkAccount";
import WalletConnectAccount from "src/app/components/Account/WalletConnectAccount";
import BasicModalContent from "src/app/components/Commons/modals/BasicModalContent";

export default function ImportModal() {
  return (
    <BasicModalContent
      customTitle="Import your Wallet"
      noPanel={true}
      content={(
        <div className="account">
          <MetamaskAccount/>
          <WalletConnectAccount/>
          <WalletLinkAccount/>
        </div>
      )}
    />
  )
}