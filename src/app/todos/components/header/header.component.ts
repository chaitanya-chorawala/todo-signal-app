import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  text: string = '';
  todosService = inject(TodosService);

  changeText(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
  }
  
  addTodo(){
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
