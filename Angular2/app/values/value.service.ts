import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Value } from './value';

@Injectable()
export class ValueService {
    private baseUrl: string = 'http://localhost:3013/api/values/';
    constructor(private http: Http) { }

    getAll(): Observable<Value[]> {
        let value$ = this.http
            .get(`${this.baseUrl}`, { headers: this.getHeaders() })
            .map(resp => resp.json())
        return value$;
    }
    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}
// this could also be a private method of the component class
function handleError(error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}