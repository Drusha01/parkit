import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = forwardRef(({ onScanSuccess, onScanError }, ref) => {
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  useEffect(() => {
    let html5QrCode;

    if (isScanning) {
      html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScanSuccess(decodedText);
          },
          (error) => {
            onScanError(error);
          }
        )
        .catch((err) => {
          console.error("Camera start error:", err);
        });

      setScanner(html5QrCode);
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch((err) => console.error("Camera stop error:", err));
      }
    };
  }, [isScanning]);

  const handleClose = async () => {
    if (scanner && scanner.isScanning) {
      try {
        await scanner.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    } else {
      setIsScanning(false);
    }
  };

  const handleOpen = () => {
    if (!isScanning) {
    //   setIsScanning(true);
    }
  };

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    closeScanner: handleClose,
    openScanner: handleOpen
  }));

    return (
        <>
            {isScanning && (
                <div className="w-full border border-gray-400">
                    <div id="qr-reader" ></div>
                </div>
            )}
        </>
    );
});

export default QRScanner;
