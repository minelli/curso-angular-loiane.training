import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    // const request = new HttpRequest('POST', url, formData);
    // return this.httpClient.request(request);

    return this.httpClient.post(url, formData,
      {
        observe: 'events',
        reportProgress: true
      });
  }

  download(url: string) {
    return this.httpClient.get(url, {
      responseType: 'blob' as 'json'
    });
  }
}
