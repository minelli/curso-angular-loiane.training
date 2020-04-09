import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlunosGuard implements CanActivateChild {
    constructor() { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        // console.log(route);
        // console.log(state);

        console.log('AlunosGuard: Guarda de rota filha');

        if (state.url.includes('editar')) {
            // alert('Usuário sem acesso');
            // return false;
            return of(true);
        }
        return true;
    }
}