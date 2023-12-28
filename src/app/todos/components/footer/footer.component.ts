import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/Filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent{
  
  todosService = inject(TodosService)
  filterSignal = this.todosService.filterSignal;
  filterEnum = FilterEnum
  noTodosCount = this.todosService.noTodosCount;
  activeCount = computed(() => {
    const count = this.todosService.todosSignal().filter((todo) => !todo.isCompleted).length;
    return `${count} item${count !== 1 ? 's' : ''} left`
  })  
  
  changeFilter(event: Event, filter: FilterEnum){
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}
