import React, { useState } from "react";

export default function Home() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="home">
      <div className='mt-5 mb-5'>
        <div className="toggle">
          <input type="checkbox" id="toggle" checked={checked} onChange={() => setChecked(!checked)} />
          <label htmlFor="toggle" />
        </div>
      </div>

      <div className='mt-5 mb-5'>
        <label className="option row">
          <div>
            <span>Option 1</span>
            <input
              className="option__radio"
              type="radio"
            />
            <span className="option__check" />
          </div>
        </label>
        <label className="option row">
          <div>
            <span>Option 2</span>
            <input
              className="option__radio"
              type="radio"
            />
            <span className="option__check" />
          </div>
        </label>
      </div>
    </div>
  )
}