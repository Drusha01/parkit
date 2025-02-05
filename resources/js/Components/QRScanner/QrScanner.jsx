import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScanSuccess, onScanError }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10, // Frames per second (higher = smoother scanning)
      qrbox: 250, // Size of the scanning box
    });

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        // scanner.clear(); // Stop scanning after a successful scan
      },
      (error) => {
        onScanError(error);
      }
    );

    return () => scanner.clear();
  }, [onScanSuccess, onScanError]);

  return <div id="qr-reader" className="w-64 h-64 border border-gray-400"></div>;
};

export default QRScanner;
