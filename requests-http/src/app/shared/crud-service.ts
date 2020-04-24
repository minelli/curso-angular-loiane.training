import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';

export class CrudService<T> {

    constructor(protected http: HttpClient, private API_URL) { }

    list() {
        return this.http.get<T[]>(this.API_URL).pipe(
            delay(2000),
            // tap(console.log)
        );
    }

    loadById(id: number) {
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(
            take(1), // tenta uma vez e finaliza o observable
        );
    }

    private create(instance: T) {
        return this.http.post(this.API_URL, instance).pipe(
            take(1), // tenta uma vez e finaliza o observable
        );
    }

    private update(instance: T) {
        return this.http.put(`${this.API_URL}/${instance['id']}`, instance).pipe(
            take(1), // tenta uma vez e finaliza o observable
        );
    }

    save(instance: T) {
        if (instance['id']) {
            return this.update(instance);
        } else {
            return this.create(instance);
        }
    }

    remove(id) {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(
            take(1), // tenta uma vez e finaliza o observable
        );
    }
}
