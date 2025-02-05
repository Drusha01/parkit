import { useState } from "react";
import QRScanner from "../../../../Components/QRScanner/QRScanner";

export default function Scan () {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-xl font-bold">QR Code Scanner</h1>
        <QRScanner 
        onScanSuccess={(data) => setResult(data)} 
        onScanError={(err) => setError(err)}
        />
        {result && <p className="text-green-600 font-bold">Scanned: {result}</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  )
}
