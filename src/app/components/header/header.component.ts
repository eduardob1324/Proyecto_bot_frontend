import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.getHoraActual();
    this.name = this.authService.getUserName();
    this.profile = this.authService.getProfile();
  }

  hora: any;
  name: any;
  profile: any;

  constructor(private authService: AuthService){

  }

  getFechaActual() {
    dayjs.locale('es');
    let fecha = new Date();
    return (
      dayjs(fecha).format('dddd') +
      ' ' +
      dayjs(fecha).format('DD') +
      ' de ' +
      dayjs(fecha).format('MMMM') +
      ' de ' +
      dayjs(fecha).format('YYYY')
    );
  }

  getHoraActual() {
    this.hora = new Date();
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }

  closeSesion() {
    return this.authService.methodCloseSesion();
  }


}
