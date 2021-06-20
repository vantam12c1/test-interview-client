import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';

  @HostListener('click', ['$event']) onClick(e) {
    if(e.target.classList.contains('mobile__bars')) {
      let sidebar = document.querySelector('.sidebar');
      if(sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      } else {
        sidebar.classList.add('active');
      }     
    } 
    if(e.target.classList.contains('sidebar__close')) {
      let sidebar = document.querySelector('.sidebar');
      sidebar.classList.remove('active'); 
    }  
  }
}

