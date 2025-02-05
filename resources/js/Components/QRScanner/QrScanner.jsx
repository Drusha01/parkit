import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const html5QrCode = new Html5Qrcode("qr-reader");
      
      html5QrCode.start(
        { facingMode: "environment" }, // Uses the back camera
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScanSuccess(decodedText);
          // html5QrCode.stop().then(() => setIsScanning(false));
        },
        (error) => {
          onScanError(error);
        }
      ).catch((err) => {
        console.error("Camera start error:", err);
      });

      setScanner(html5QrCode);
    }

    return () => {
      if (scanner) {
        scanner.stop().catch((err) => console.error("Camera stop error:", err));
      }
    };
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center gap-4">
      {!isScanning && (
        <button
          onClick={() => setIsScanning(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Camera & Scan QR
        </button>
      )}
      <div id="qr-reader" className={`w-64 h-64 border border-gray-400 ${!isScanning && "hidden"}`}></div>
    </div>
  );
};

export default QRScanner;
