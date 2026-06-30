import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Router],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  ngOnInit(){

this. .getProfile().subscribe({

next:(res)=>{

console.log(res);

}

});

}
}
