import { Component, ElementRef, ViewChild } from '@angular/core';
import { ErrorMediaService } from 'src/app/services/error-media.service';
import { MediaDeviceService } from 'src/app/services/media-device.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {

  @ViewChild('videoElement')
  videoElement!: ElementRef<HTMLVideoElement>;

  constructor(
    private errorService: ErrorMediaService,
    private deviceService: MediaDeviceService
  ) { }


  ngOnInit(): void {
    console.log('CameraComponent.ngOnInit()');
    this.deviceService.getDevicesCamera().then((devices: MediaDeviceInfo[]) => {
      console.log('camera devices', devices);
    });

    this.deviceService.getDevicesMicrophone().then((devices: MediaDeviceInfo[]) => {
      console.log('microphones devices', devices);
    });

    this.deviceService.getDevicesSpeaker().then((devices: MediaDeviceInfo[]) => {
      console.log('speakers devices', devices);
    });
  }


  async startWebcam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        await navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
          this.videoElement.nativeElement.srcObject = stream;
        })
        .catch((error: DOMException) => {

          this.errorService.getErrorCamera(error);

        });

    } else {
      console.error('Webcam not supported by this browser.');
    }
  }


  stopWebcam() {
    if (this.videoElement.nativeElement.srcObject) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });

      this.videoElement.nativeElement.srcObject = null;
    }
    else {
      console.error('No webcam stream to stop.');
    }
  }

}
