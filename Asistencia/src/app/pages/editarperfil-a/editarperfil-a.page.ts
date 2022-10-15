import { Component, OnInit } from '@angular/core';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-editarperfil-a',
  templateUrl: './editarperfil-a.page.html',
  styleUrls: ['./editarperfil-a.page.scss'],
})
export class EditarperfilAPage implements OnInit {
  imageData: any;
  constructor(private c: TomarFotoService) { }
  tomarF(){
    this.c.takePicture();
  }

  ngOnInit() {
    this.c.regresarfoto().subscribe((res) => {
      this.imageData = res;
    })
  }

}
