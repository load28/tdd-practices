import {AppComponent} from './app.component';
import {createComponentFactory} from '@ngneat/spectator';
import {of, throwError} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';

const reqTodoHttpMock = jest.fn(() => of(['a', 'b', 'c']));

describe('AppComponent', () => {
  const componentFactory = createComponentFactory({
    component: AppComponent,
    imports: [HttpClientModule]
  });

  it('todo - create todo component', () => {
    const spectator = componentFactory();
    const {component} = spectator;

    expect(component).toBeTruthy();
  });

  it('todo - http req', (done) => {
    const spectator = componentFactory();
    const {component} = spectator;

    component.reqTodoHttp$ = reqTodoHttpMock;
    component.reqTodo().subscribe(data => {
      expect(data).toStrictEqual(['a', 'b', 'c']);
      done();
    });
  });

  it('todo - http req error', (done) => {
    const spectator = componentFactory();
    const {component} = spectator;

    component.reqTodoHttp$ = jest.fn(() => throwError('http error'));
    component.reqTodo().subscribe((data: string[]) => {
      expect(data).not.toBeTruthy();
      done();
    }, err => {
      expect(err).toBe('reqTodo error');
      done();
    });
  });

  it('todo - get list', (done) => {
    const spectator = componentFactory();
    const {component} = spectator;

    component.reqTodoHttp$ = reqTodoHttpMock;

    component.getTodo(false).subscribe(data => {
      expect(data).toStrictEqual(['a', 'b', 'c']);
    });

    component.getTodo(true).subscribe(data => {
      expect(data).toStrictEqual(['asum', 'bsum', 'csum']);
      done();
    });
  });

  it('todo - add todo error', (done) => {
    const spectator = componentFactory();
    const {component} = spectator;

    component.addReqHttp$ = jest.fn(() => throwError('error'));
    component.reqAddTodo('test todo').subscribe(data => {
    }, err => {
      expect(err).toBe('addTodo error');
      done();
    });
  });

  it('todo - add todo', (done) => {
    const spectator = componentFactory();
    const {component} = spectator;

    component.addReqHttp$ = jest.fn(() => of('success'));
    component.addTodo('test todo');
    setTimeout(() => {
      expect(component.todo).toContain('test todo');
      done();
    });
  });
});
