import { Component, OnInit } from '@angular/core';
import { Router,  Params} from '@angular/router';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private settingsService:SettingsService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLoggedIn=true;
        this.loggedInUser=auth.email;
      }else{
        this.isLoggedIn=false;
      }
    });
    this.showRegister=this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are now Logged Out',{
      cssClass:'alert-success',timeout:4000
    });
    this.router.navigate(['/login']);
  }
}
