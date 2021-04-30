import React from "react";
import { modalService } from "src/app/components/Commons/Modals/ModalListener";
import ImportModal from "src/app/components/Account/ImportModal";

export default function Header() {
  function openImportModal() {
    modalService.show(ImportModal);
  }

  return (
    <div className="header pt-5 bp-5">
      <div  className='btn btn--gradient' onClick={openImportModal}>Connect Wallet</div>
    </div>
  )
}