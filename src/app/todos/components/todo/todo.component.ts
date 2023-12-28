import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ITodo } from '../../types/ITodo.interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({required: true}) todo!: ITodo;
  @Input({required: true}) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('editInput') editInput?: ElementRef;
  todosService = inject(TodosService)
  editingText: string = '';
  
  ngOnInit(): void {
    this.editingText = this.todo.text;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditing']?.currentValue){
      setTimeout(() => {        
        this.editInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo.id);
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }
}
