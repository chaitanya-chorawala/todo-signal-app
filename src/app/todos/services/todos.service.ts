import { Injectable, computed, signal } from '@angular/core';
import { ITodo } from '../types/ITodo.interface';
import { FilterEnum } from '../types/Filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todosSignal = signal<ITodo[]>([]);
  filterSignal = signal<FilterEnum>(FilterEnum.all);  
  noTodosCount = computed(() => this.todosSignal().length === 0)

  changeFilter(filter: FilterEnum): void {
    this.filterSignal.set(filter);
  }

  addTodo(text: string): void {
    const newTodo: ITodo = {
      id: Math.random().toString(16),
      text: text,
      isCompleted: false
    };

    this.todosSignal.update(todos => [...todos, newTodo]);
  }

  changeTodo(id: string, text: string): void {
    this.todosSignal.update((todos) => 
      todos.map((todo) => todo.id === id ? {...todo, text: text} : todo)
    )
  }

  removeTodo(id: string): void {
    this.todosSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }
  
  toggleTodo(id: string): void {
    this.todosSignal.update((todos) => 
      todos.map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    )
  }

  toggleAllTodo(isCompleted: boolean): void {
    this.todosSignal.update((todos) => 
      todos.map((todo) => ({...todo, isCompleted: isCompleted}))
    )
  }
}
