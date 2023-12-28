import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/Filter.enum';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TodoComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;
  isAllChecked = computed(() => this.todosService.todosSignal().every((todo) => todo.isCompleted))
  noTodosCount = this.todosService.noTodosCount;

  filteredTodos = computed(() => {
    const todos = this.todosService.todosSignal();
    const currentFilter = this.todosService.filterSignal();

    if(currentFilter === FilterEnum.active){
      return todos.filter((todo) => !todo.isCompleted);
    } else if (currentFilter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;    
  })

  setEditingId(id: string | null): void {
    this.editingId = id;
  }

  toggleAllTodo(event: Event): void {
    const isCompleted = (event.target as HTMLInputElement).checked;
    this.todosService.toggleAllTodo(isCompleted);
  }
}
