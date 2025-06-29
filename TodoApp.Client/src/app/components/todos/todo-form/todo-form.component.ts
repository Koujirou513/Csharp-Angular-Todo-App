import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<Todo>();

  newTodo: Todo = {
    id: 0,
    title: '',
    description: '',
    isCompleted: false,
    createdAt: new Date()
  };

  isSubmitting = false;
  errorMessage = '';

  constructor(private todoService: TodoService) {}

  onSubmit(): void {
    if (!this.newTodo.title.trim()) {
      this.errorMessage = 'タイトルを入力してください';
      return;
    }
  

    this.isSubmitting = true;
    this.errorMessage = '';

    this.todoService.createTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.todoCreated.emit(todo);
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error creating todo:', error);
        this.errorMessage = 'Todoの作成に失敗しました';
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.newTodo = {
      id: 0,
      title: '',
      description: '',
      isCompleted: false,
      createdAt: new Date()
    };
  }
}
