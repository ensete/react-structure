import React from "react";
import { modalService } from "src/app/components/Commons/modals/ModalListener";
import ImportModal from "src/app/components/Account/ImportModal";

export default function Header() {
  function openImportModal() {
    modalService.show(ImportModal);
  }

  return (
    <div className="header">
      <div onClick={openImportModal}>Connect Wallet</div>
    </div>
  )
}