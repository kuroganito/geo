import { Component, ViewChild } from '@angular/core';
import { Ng2MapComponent } from 'ng2-map';
import {DataService,Poly} from './servicios/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(Ng2MapComponent) ng2MapComponent: Ng2MapComponent;
  public map: google.maps.Map;
  public points:Array<Poly>;
  show:boolean=false;
  constructor(public dataService: DataService) {
    Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyCZxVRn0xiDQx_OuA8XOluYEvshv9wB84o';
  }

  ngOnInit() {
    this.points = this.dataService.getPoly();
  }
   
  mostrarMenu(){
    this.show = !this.show;
    console.log(this.show)
     
  } 

}
