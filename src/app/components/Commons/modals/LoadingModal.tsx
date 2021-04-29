import React from "react";
import Loading from "src/app/components/Commons/Loading";
import { useDispatch, useSelector } from "react-redux";
import BasicModalContent from "src/app/components/Commons/modals/BasicModalContent";
import Modal from "src/app/components/Commons/modals/Modal";
import { setGlobalModal } from "src/app/actions/globalAction";

export default function LoadingModal() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state: any) => state.global);

  function handleClose() {
    dispatch(setGlobalModal('loading', false));
  }

  return (
    <Modal
      className='loading-modal'
      isActive={modal.loading}
      onClose={handleClose}
      hideCloseBtn={true}
    >
      <BasicModalContent
        noPanel={true}
        content={(
          <div className="align-center">
            <Loading/>
          </div>
        )}
      />
    </Modal>
  )
}
