import { useState } from 'react';
import QRCode from 'qrcode';

export default function Home() {
  const [selected, setSelected] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [pixCode, setPixCode] = useState('');

  const pixKey = "00020126580014BR.GOV.BCB.PIX01360cdfea6c-a192-45ee-8bfa-53c407f811b152040000530398654051.005802BR5913Rumo a 1 Milhão6009Sao Paulo62070503***6304";

  const generatePix = () => {
    const total = selected.length;
    const valor = (total * 1).toFixed(2);
    const fullPix = pixKey + valor;
    setPixCode(fullPix);
    QRCode.toDataURL(fullPix).then(setQrCode);
  };

  const handleSquareClick = (i) => {
    setSelected(prev =>
      prev.includes(i) ? prev.filter(n => n !== i) : [...prev, i]
    );
  };

  const squares = [];
  for (let i = 0; i < 10000; i++) {
    squares.push(
      <div
        key={i}
        onClick={() => handleSquareClick(i)}
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: selected.includes(i) ? 'blue' : '#eee',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Rumo a 1 Milhão</h1>
      <button onClick={generatePix}>Gerar Pix</button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(100, 10px)', gap: '1px' }}>
        {squares}
      </div>
      {pixCode && <>
        <h2>Pix Copia e Cola:</h2>
        <textarea readOnly value={pixCode} style={{ width: '100%' }} />
        {qrCode && <img src={qrCode} alt="QR Code Pix" />}
      </>}
    </div>
  );
}