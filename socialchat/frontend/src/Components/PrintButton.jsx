// src/components/PrintButton.js
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Receipt from './Receipt';

const PrintButton = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="bg-blue-500 text-white px-4 py-2 rounded">Print Receipt</button>}
        content={() => componentRef.current}
        pageStyle="@page { size: 80mm 297mm; margin: 0; }"
      />
      <Receipt ref={componentRef} />
    </div>
  );
};

export default PrintButton;
