import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;
  subscripiton: Subscription;
  progress = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscripiton.unsubscribe();
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      // const url = 'http://localhost:8000/upload';
      const url = `${environment.BASE_URL}/upload`;
      this.subscripiton = this.service.upload(this.files, url).pipe(
        uploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      ).subscribe(response => console.log('Upload Concluído'));
      // .subscribe((event: HttpEvent<Object>) => {
      //   console.log(event);
      //   if (event.type === HttpEventType.Response) {
      //     console.log('upload concluido');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / event.total);
      //     console.log('Progresso', percentDone);
      //     this.progress = percentDone;

      //   }
      // });
    }
  }

  onDownloadExcel() {
    this.service.download(`${environment.BASE_URL}/downloadExcel`).subscribe(
      (response: any) => this.handleFile(response, 'report.xlsx'));
  }

  onDownloadPDF() {
    this.service.download(`${environment.BASE_URL}/downloadPDF`).subscribe(
      (response: any) => this.handleFile(response, 'report.pdf'));
  }

  handleFile(response: any, fileName: string) {
    // console.log(response);
    const file = new Blob([response], {
      type: response.type
    });

    // Internet Explorer
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;
    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => {
      // firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }


}
