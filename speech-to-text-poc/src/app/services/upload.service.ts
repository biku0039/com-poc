import { Injectable } from '@angular/core';
import 'rxjs-compat/add/operator/map';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class UploadService {


    constructor(
        private http: HttpClient
    ) { }

    uploadFile(formData) {
        return this.http.post('/api/upload', formData);
    }
}
