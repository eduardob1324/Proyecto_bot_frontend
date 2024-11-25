import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  profile_id:any;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.profile_id = this.authService.getProfile_id();
  }
}
