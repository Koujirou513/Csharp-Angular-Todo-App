import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ObservedValuesFromArray } from "rxjs";
import { Todo } from '../models/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private apiUrl = 'http://localhost:5004/api/todos';

    constructor(private http: HttpClient) {}

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    getTodo(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiUrl}/${id}`);
    }

    createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    updateTodo(id: number, todo: Todo): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, todo);
    }

    deleteTodo(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}