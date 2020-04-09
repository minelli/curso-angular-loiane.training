import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  private VerificarAcesso() {
    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log('canLoad: verificando se o usuario pode carregar o código do módulo');
    return this.VerificarAcesso();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('AuthGuard');
    return this.VerificarAcesso();
  }
}
