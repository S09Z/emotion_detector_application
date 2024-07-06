import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';

const CameraDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setStream(mediaStream);
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && stream) {
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} className="border rounded-lg" width="600" height="400" />
      <div className="mt-4 flex space-x-4">
        <Button variant="contained" color="primary" onClick={startCamera}>
          Start Camera
        </Button>
        <Button variant="contained" color="secondary" onClick={stopCamera}>
          Stop Camera
        </Button>
      </div>
    </div>
  );
};

export default CameraDetector;
