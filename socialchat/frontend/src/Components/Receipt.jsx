// src/components/Receipt.js
import React from 'react';

const Receipt = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-[80mm] p-4 text-sm bg-white">
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">AZUR</h1>
        <p className="text-xs">SIE ITEMSEM</p>
        <p className="text-xs">Matricule fiscale: 0984906CM000</p>
        <p className="text-xs">Adresse: AV HABIB BOURGUIBA BOUJHAR MONASTIR</p>
        <p className="text-xs">Telephone: 73434636</p>
        <p className="text-xs font-bold">Ticket</p>
      </div>
      <div className="mb-4">
        <p className="text-xs">B.L. N 0404908065</p>
        <p className="text-xs">Date: 03/05/2024 08:21</p>
        <p className="text-xs">Client: Mag nour - nouredine gordoghli</p>
        <p className="text-xs">Code Client: C001626</p>
        <p className="text-xs">Monastir SAHEL/ bouhjar</p>
      </div>
      <div className="mb-4">
        <p className="text-xs">Vendeur: THAMER BEN SALAH[UD049]</p>
      </div>
      <table className="w-full mb-4 text-xs border-collapse">
        <thead>
          <tr>
            <th className="border p-1">Item Name</th>
            <th className="border p-1">p.u</th>
            <th className="border p-1">Qte</th>
            <th className="border p-1">TOTAL (TTC)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-1">ASSOUP LILAS DOUCEUR EXTREME 1 L</td>
            <td className="border p-1">100/PC</td>
            <td className="border p-1">TND 0.500</td>
            <td className="border p-1">TND 50.301</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
      <div className="mb-4">
        <p className="text-xs">Nbr Des Articles: 8</p>
      </div>
      <div className="mb-4">
        <p className="text-xs font-bold">Montant à Payer (TND): 400.604</p>
        <p className="text-xs">Seulement Quatre Cent TND et Six Cent Quatre</p>
      </div>
      <div className="mb-4">
        <p className="text-xs">Méthodes de Payement:</p>
        <p className="text-xs">En Espèces (TND): 400.604</p>
        <p className="text-xs">Total Restant (TND): 0.000</p>
      </div>
      <div className="text-center mb-4">
        <p className="text-xs">Copie marchande</p>
        <p className="text-xs">Printé on 03/05/2024 08:21:38.21/12/14</p>
      </div>
      <div className="text-center">
        <p className="text-xs">ALIMENTÉ PAR QUAYO MOBILITY SOLUTION</p>
        <p className="text-xs">INFO@QUAYOMOBILITY.CA</p>
        <p className="text-xs">CONTACT: +961 1 873 448 / +961 3 426 448</p>
      </div>
    </div>
  );
});

export default Receipt;
