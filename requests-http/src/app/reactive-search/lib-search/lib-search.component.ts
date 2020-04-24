import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'
  results$: Observable<any>;
  total: number;
  readonly fields = 'name,description,version,homepage';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200), // delay
      distinctUntilChanged(), // ignora repetições, só 'avança' quando  valor muda
      // tap(value => console.log(value)),
      switchMap(value => this.httpClient.get(this.SEARCH_URL,
        {
          params: {
            search: value,
            fields: this.fields
          }
        }
      )),
      tap((response: any) => this.total = response.total),
      map((response: any) => response.results)
    );
  }

  onSearch() {
    // console.log(this.queryField.value);
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      const params = {
        search: value,
        fields: fields
      };

      let httpParams = new HttpParams();
      httpParams = httpParams.set('search', value);
      httpParams = httpParams.set('fields', fields);

      this.results$ =
        // this.httpClient.get(this.SEARCH_URL + '?fields' + fields + '=&search=' + value)
        // this.httpClient.get(this.SEARCH_URL, { params })
        this.httpClient.get(this.SEARCH_URL, { params: httpParams })
          .pipe(
            tap((response: any) => this.total = response.total),
            map((response: any) => response.results)
          );
    }
  }

}
