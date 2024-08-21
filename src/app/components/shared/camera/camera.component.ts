import { Component, ElementRef, ViewChild } from '@angular/core';
import { CameraConfig } from 'src/app/configs/camera.config';
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

  @ViewChild('videoCanvas')
  videoCanvas: ElementRef<HTMLCanvasElement>;

  private videoStream: MediaStream | null = null;
  public mediaDevices: MediaDeviceInfo[] = [];

  imageUser = "assets/user-profile.png"


  constructor(
    private errorService: ErrorMediaService,
    private deviceService: MediaDeviceService
  ) { 
  }


  ngAfterViewInit(): void {
    this.listMediaDevices();
    this.initCanvas()
  }

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

        await navigator.mediaDevices.getUserMedia(CameraConfig.VIDEO_CONSTRAINTS).then((stream: MediaStream) => {
          this.videoElement.nativeElement.srcObject = stream;
          this.videoStream = stream;
          this.updateCanvas();
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
      this.videoStream = this.videoElement.nativeElement.srcObject as MediaStream;
      const tracks = this.videoStream.getTracks();

      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });

      this.videoElement.nativeElement.srcObject = null;
      this.videoStream = null;
      this.initCanvas();
    }
    else {
      console.error('No webcam stream to stop.');
    }
  }

  listMediaDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        console.log("devices", devices)
        this.mediaDevices = devices.filter(device => device.kind === 'videoinput' || device.kind === 'audioinput');
      })
      .catch(err => console.error('Error al listar dispositivos de medios:', err));
  }


  initCanvas() {
    const canvas = this.videoCanvas.nativeElement;
    const context = canvas.getContext('2d');
  
    if (context) {
      const image = new Image();
      image.src = this.imageUser; // Ruta a tu imagen en los assets
      
      image.onload = () => {
        // Centrar la imagen en el canvas
        context.fillStyle = '#2C3E50'; // Cambia el color de fondo aquí
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Centrar la imagen en el canvas
        const imgWidth = canvas.width / 4; // Ajusta el tamaño de la imagen
        const imgHeight = imgWidth; // Mantén la proporción
        const x = (canvas.width - imgWidth) / 2;
        const y = (canvas.height - imgHeight) / 2;

        context.drawImage(image, x, y, imgWidth, imgHeight);

      };
    }
  }
  

  updateCanvas() {
    const video = this.videoElement.nativeElement;
    const canvas = this.videoCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      const drawFrame = () => {
        if (this.videoStream) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame);
        }
      };
      drawFrame();
    }
  }
}
