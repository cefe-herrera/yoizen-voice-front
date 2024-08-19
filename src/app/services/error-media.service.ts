import { Injectable } from '@angular/core';
import { ErrorsConstants } from '../components/error.constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorMediaService {

  constructor() { }

  public getErrorCamera(error: DOMException): void {
    switch (error.name) {
      case ErrorsConstants.NOT_FOUND_ERROR_CAMERA.name:
        alert(ErrorsConstants.NOT_FOUND_ERROR_CAMERA.message);
        break;
      case ErrorsConstants.NOT_READABLE_ERROR_CAMERA.name:
        alert(ErrorsConstants.NOT_READABLE_ERROR_CAMERA.message);
        break;
      case ErrorsConstants.OVERCONSTRAINED_ERROR_CAMERA.name:
        alert(ErrorsConstants.OVERCONSTRAINED_ERROR_CAMERA.message);
        break;
      case ErrorsConstants.SECURITY_ERROR_CAMERA.name:
        alert(ErrorsConstants.SECURITY_ERROR_CAMERA.message);
        break;
      case ErrorsConstants.NOT_ALLOWED_ERROR_CAMERA.name:
        alert(ErrorsConstants.NOT_ALLOWED_ERROR_CAMERA.message);
        break;
      default:
        alert(ErrorsConstants.DEFAULT_ERROR_CAMERA.message);
        break;
    }
  }
}
