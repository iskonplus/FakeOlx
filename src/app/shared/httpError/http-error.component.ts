
import { Component } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-http-error',
  templateUrl: './http-error.component.html',
  styleUrl: './http-error.component.scss'
})
export class HttpErrorComponent {

  constructor(public errorService: ErrorService){}
}
