export class CameraConfig {
    static readonly VIDEO_CONSTRAINTS: MediaStreamConstraints = {
      video: {
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
        aspectRatio: 1.777777778,
        frameRate: { ideal: 30, max: 60 },
        facingMode: 'environment',
        //deviceId: 'your-video-device-id'
      },
      audio: {
        sampleRate: { ideal: 44100 },
        echoCancellation: true,
        noiseSuppression: true,
        //deviceId: 'your-audio-device-id'
      }
    };
  }