import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

const VoiceDetector: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let javascriptNode: ScriptProcessorNode;

    const handleSuccess = (stream: MediaStream) => {
      audioContext = new (window.AudioContext || window.AudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const average = array.reduce((a, b) => a + b) / array.length;
        setVolume(average);
      };
    };

    if (isListening) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess);
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isListening]);

  return (
    <div className="flex flex-col items-center mt-4">
      <Button variant="contained" color="primary" onClick={() => setIsListening(!isListening)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <div className="w-full mt-4">
        <LinearProgress variant="determinate" value={Math.min(volume, 100)} />
      </div>
    </div>
  );
};

export default VoiceDetector;
