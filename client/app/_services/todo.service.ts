import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Todo } from '../_models/index';

@Injectable()
export class TodoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/todos', this.jwt()).map((response: Response) => response.json());
    }

    

    create(todo: Todo) {
        return this.http.post(this.config.apiUrl + '/todos/register', todo, this.jwt());
    }

   

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/todos/' + _id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}