import React, { useEffect, useState } from "react";
import Modal from "src/app/components/commons/Modal";

const modalService = {
  currentHandler: Function,
  closeFn: Function,
  reg: function (fn: any, closeFn: any) {
    this.currentHandler = fn;
    this.closeFn = closeFn;
  },
  show: function (Component: React.ComponentType<any>, props = {}, onClose?: any) {
    this.currentHandler(
      // @ts-ignore
      (close: any) => <Component {...{close}} {...props} />,
      onClose,
      props,
    )
  },
  close: function () {
    if (this.closeFn !== null) {
      this.closeFn()
    }
  }
};

const ModalListener = () => {
  const [ modalContent, setModalContent ] = useState("");
  const [ , setOnClose ] = useState(null);
  const [ props, setProps ] = useState({});

  const close = () => {
    setModalContent("");
    setOnClose(null);
  };

  useEffect(() => {
    modalService.reg((content: any, onClose: any, modalProps: any) => {
      setOnClose(() => onClose);
      setProps(modalProps);
      setModalContent(typeof content === "function" ? content(() => {
        if (onClose != null) onClose();
        setModalContent("");
      }) : content);
    }, close)
  }, []); // eslint-disable-line

  return (
    <Modal isActive={!!modalContent} {...props} onClose={close}>
      {modalContent}
    </Modal>
  )
};

export { modalService, ModalListener }