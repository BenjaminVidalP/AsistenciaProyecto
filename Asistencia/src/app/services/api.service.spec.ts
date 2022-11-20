import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';


import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new ApiService(httpClient);
  });

  // Prueba 1

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('nombre de profesor', () => {
    it('obtener nombre de profesor', () => {
      service.getPosts().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          nombre: "v.rosendo5",
          clave: "J.12mm5",
          id_rol: 1}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 1,
          nombre: "v.rosendo5",
          clave: "J.12mm5",
          id_rol: 1}, });
      httpTestingController.verify();
    });
  });

  // Prueba 2

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('nombre de ramos', () => {
    it('obtener nombre de ramos', () => {
      service.getPosts1().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          sigla: "PGY4237",
          nombre: "Programación de Base de Datos"}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/ramos/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 1,
          sigla: "PGY4237",
          nombre: "Programación de Base de Datos"}, });
      httpTestingController.verify();
    });
  });

  // Prueba 3

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('tipo de seccion2', () => {
    it('obtener tipo de seccion2', () => {
      service.getPosts2().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 2,
          sigla: "002D"}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion/seccion/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 2,
          sigla: "002D"}, });
      httpTestingController.verify();
    });
  });

  // Prueba 4

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('ids de asigsecci', () => {
    it('obtener ids de asigsecci', () => {
      service.getPosts3().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          id_ramo: 1,
          id_seccion: 2,
          id_profesor: 1}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion/asigsecci/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 1,
          id_ramo: 1,
          id_seccion: 2,
          id_profesor: 1}, });
      httpTestingController.verify();
    });
  });





  // Prueba 5 repetidas

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('tipo de seccion1', () => {
    it('obtener tipo de seccion1', () => {
      service.getPosts2().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          sigla: "001D"}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion/seccion/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: {  id: 1,
          sigla: "001D"}, });
      httpTestingController.verify();
    });
  });

  // Prueba 6 repetidas

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('tipo de seccion1', () => {
    it('obtener tipo de seccion1', () => {
      service.getPosts().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 2,
          nombre: "j.baez5",
          clave: "B.34vf5",
          id_rol: 2}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 2,
          nombre: "j.baez5",
          clave: "B.34vf5",
          id_rol: 2}, });
      httpTestingController.verify();
    });
  });

  
});
