import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaDeviceService {

  constructor() { }

  async getDevicesCamera(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
  }

  async getDevicesMicrophone(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'audioinput');
  }

  async getDevicesSpeaker(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'audiooutput');
  }

  async startCamera(deviceId: string): Promise<MediaStream> {
    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: deviceId
      }
    };

    return await navigator.mediaDevices.getUserMedia(constraints);
  }

  stopCamera(stream: MediaStream): void {
    const tracks = stream.getTracks();

    tracks.forEach((track: MediaStreamTrack) => {
      track.stop();
    });
  }
}
