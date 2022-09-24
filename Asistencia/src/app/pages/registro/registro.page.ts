import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string;

  usuario ={
    email: '',
    password:''

  };
  emailPattern: any = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5),
      Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4),
        Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), 
        Validators.maxLength(10)]),
    })
  }

  constructor(private menu: MenuController) { 
    this.menu.enable(false);
  }
  
  ngOnInit() {
  }


  onSubmitTemplate(){
    console.log('Form submit')
    console.log(this.usuario);
  }

}
