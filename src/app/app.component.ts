import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TDD';
  todo: string[] = [];

  // 간단한 기능을 만들어보자, 할 일 리스트를 가지고 있고 그에 따라서 추가 삭제 업데이트 할 수 있도록 해보자

  constructor(private httpClient: HttpClient) {
  }

  reqTodoHttp$(): Observable<string[]> {
    return this.httpClient.get<string[]>('getTodoList');
  }

  addReqHttp$(todo: string): Observable<string> {
    return this.httpClient.post<string>('addTodo', todo);
  }

  reqTodo(): Observable<string[]> {
    return this.reqTodoHttp$().pipe(catchError(err => throwError('reqTodo error')));
  }

  reqAddTodo(todo: string): Observable<string> {
    return this.addReqHttp$(todo).pipe(catchError(err => throwError('addTodo error')));
  }

  getTodo(isSum: boolean): Observable<string[]> {
    if (isSum) {
      return this.reqTodo().pipe(map(s => s.map(c => c + 'sum')));
    } else {
      return this.reqTodo();
    }
  }

  addTodo(todo: string): void {
    this.reqAddTodo(todo).subscribe(res => {
      if (res === 'success') {
        this.todo.push(todo);
      }
    });
  }
}
