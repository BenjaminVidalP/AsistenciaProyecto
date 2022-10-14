import { Component, OnInit } from '@angular/core';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-pruebacam',
  templateUrl: './pruebacam.page.html',
  styleUrls: ['./pruebacam.page.scss'],
})
export class PruebacamPage implements OnInit {
  imageData: any;
  constructor(private c: TomarFotoService ) {}

  tomarF(){
    this.c.takePicture();
  }

  ngOnInit() {
    this.c.regresarfoto().subscribe((res)=>{
      this.imageData = res;
    })
  }

}
