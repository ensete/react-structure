import React from "react";

export default function BasicModalContent(props: any) {
  return (
    <div className={`basic-modal ${props.className ? props.className : ''}`}>
      <div className="basic-modal__content">
        {props.content}
      </div>
      {!props.noPanel && (
        <div className="basic-modal__panel">
          <div className="btn" onClick={props.close}>Cancel</div>

          {!!props.submit && (
            <div className="btn btn--gradient" onClick={props.submit}>Confirm</div>
          )}
        </div>
      )}
    </div>
  )
}