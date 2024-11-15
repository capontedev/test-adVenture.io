import { Component } from '@angular/core';
import { ITodo } from './todo.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ad-ventures.io';
  listTodo = new BehaviorSubject<ITodo[]>([]);

  constructor() {
    this.addTask('Organize Garage');
    this.addTask('Bake Cookies');
    this.addTask('Do Laundry');
    this.addTask('Make Dinner');
    this.addTask('Walk Dog');
  }
  
  addTask(task: string) {
    if (task?.trim() !== '') {
      const listTodo: ITodo[] = [
        ...this.listTodo.value, 
        {
          uid: crypto.randomUUID(),
          task,
          complete: false
        },
      ];
      this.listTodo.next(listTodo);
    }
  }

  markTaksCompleted(uid: string) {
    const todo = this.listTodo.value.find(todo => todo.uid === uid);

    if (todo) {
      todo.complete = !todo.complete;
      this.listTodo.next(this.listTodo.value);
    }
  }

  clearTasksCompleted() {
    const listTodo = this.listTodo.value.filter(todo => !todo.complete);
    this.listTodo.next(listTodo);
  }

  submit(e: Event, task: HTMLInputElement) {
    console.log(e);
    e.preventDefault();
    this.addTask(task.value);
    task.value = '';
  }
}
