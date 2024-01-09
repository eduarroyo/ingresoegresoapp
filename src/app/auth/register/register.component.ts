import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public registroForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: [ '', Validators.required ],
      correo: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  crearUsuario() {
    if(this.registroForm.invalid) { return; }

    const { nombre, correo, password } = this.registroForm.value;
    this.authService
      .crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch(err => console.error(err));
  }
}
