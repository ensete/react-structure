import React from "react";
import { modalService } from "src/app/components/commons/ModalListener";
import ImportModal from "src/app/components/account/ImportModal";

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