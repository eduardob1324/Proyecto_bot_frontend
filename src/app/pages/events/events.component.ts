import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { AuthService } from '../../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent , RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private ngbModal: NgbModal,
   // private specialityService: SpecialityService,
  ){

   
  }

  ngOnInit(): void {
    this.authService.authMethod();
  }

}
