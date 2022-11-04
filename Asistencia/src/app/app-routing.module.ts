import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'perfil-alumno',
    loadChildren: () => import('./pages/perfil-alumno/perfil-alumno.module').then( m => m.PerfilAlumnoPageModule)
  },
  {
    path: 'perfil-profesor',
    loadChildren: () => import('./pages/perfil-profesor/perfil-profesor.module').then( m => m.PerfilProfesorPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'codigoqr',
    loadChildren: () => import('./pages/codigoqr/codigoqr.module').then( m => m.CodigoqrPageModule)
  },
  {
    path: 'asistencia-alumno',
    loadChildren: () => import('./pages/asistencia-alumno/asistencia-alumno.module').then( m => m.AsistenciaAlumnoPageModule)
  },
  {
    path: 'horario-alumno',
    loadChildren: () => import('./pages/horario-alumno/horario-alumno.module').then( m => m.HorarioAlumnoPageModule)
  },
  {
    path: 'asignaturas-alumno',
    loadChildren: () => import('./pages/asignaturas-alumno/asignaturas-alumno.module').then( m => m.AsignaturasAlumnoPageModule)
  },
  {
    path: 'lista-alumnos',
    loadChildren: () => import('./pages/lista-alumnos/lista-alumnos.module').then( m => m.ListaAlumnosPageModule)
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./pages/recuperar-contra/recuperar-contra.module').then( m => m.RecuperarContraPageModule)
  },
  {
    path: 'seccion',
    loadChildren: () => import('./pages/seccion/seccion.module').then( m => m.SeccionPageModule)
  },
  {
    path: 'horario-asig',
    loadChildren: () => import('./pages/horario-asig/horario-asig.module').then( m => m.HorarioAsigPageModule)
  },
  {
    path: 'editarperfil-a',
    loadChildren: () => import('./pages/editarperfil-a/editarperfil-a.module').then( m => m.EditarperfilAPageModule)
  },
  {
    path: 'editarperfil-p',
    loadChildren: () => import('./pages/editarperfil-p/editarperfil-p.module').then( m => m.EditarperfilPPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
