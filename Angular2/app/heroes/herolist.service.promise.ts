import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Hero } from './hero';

@Injectable()
export class HeroServicePromise {
    private baseUrl: string = 'http://localhost:3013/api/heroes/';
    constructor(private http: Http) { }

    getAll(): Promise<Hero[]> {
        let headers = this.getHeaders();
        var url = this.baseUrl;
        let options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Get,
            url: url,
        });
        let req = new Request(options);
        let value$ = this.http.request(req)
            .toPromise()
            .then(this.extractData)
            .catch(handleError);
         return value$;
    }

    get(id: number): Promise<Hero> {
        let headers = this.getHeaders();
        var url = this.baseUrl + id;
        let options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Get,
            url: url,
        });
        let req = new Request(options);
        let value$ = this.http.request(req)
            .toPromise()
            .then(resp => resp.json())
            .catch(handleError);
        return value$;
    }

    create(hero: Hero): Promise<Response> {
        let body = JSON.stringify(hero);
        let headers = this.getHeaders();
        var url = this.baseUrl;
        let options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post,
            url: url,
            body: body
        });
        let req = new Request(options);
        let value$ = this.http.request(req)
            .toPromise()
            .catch(handleError);
        return value$;
    }

    delete(id: number): Promise<Response> {
        let headers = this.getHeaders();
        var url = this.baseUrl + id;
        let options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Delete,
            url: url,
        });
        let req = new Request(options);
        let value$ = this.http.request(req)
            .toPromise()
            .catch(handleError);
        return value$;
    }

    update(hero: Hero): Promise<Response> {
        let body = JSON.stringify(hero);
        let headers = this.getHeaders();
        var url = this.baseUrl + hero.id;
        let options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Put,
            url: url,
            body: body
        });

        let req = new Request(options);
        let value$ = this.http.request(req)
            .toPromise()
            .catch(handleError);
        return value$;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private emptyBody(res: Response) {
        let body = {}
        return body || {};
    }
}

function handleError(error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}