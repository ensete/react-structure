import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicModalContent from "src/app/components/Commons/Modals/BasicModalContent";
import Modal from "src/app/components/Commons/Modals/Modal";
import { setGlobalModal } from "src/app/actions/globalAction";
import * as loadingJson from 'src/assets/jsons/loading-cube.json';
import Lottie from "react-lottie";
import { getAnimatedJsonOptions } from "src/app/utils/helpers";

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
            <Lottie
              height={150}
              width={200}
              isClickToPauseDisabled={true}
              options={getAnimatedJsonOptions(loadingJson)}
            />
            <div className='fw-3'>Now Loading...</div>
          </div>
        )}
      />
    </Modal>
  )
}
