import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  isUpdating = false;
  isDeleting = false;

  constructor(private todoService: TodoService) {}

  toggleComplete(): void {
    if (this.isUpdating) return;

    this.isUpdating = true;
    const updateTodo = { ...this.todo, isCompleted: !this.todo.isCompleted };

    this.todoService.updateTodo(this.todo.id, updateTodo).subscribe({
      next: () => {
        this.todo.isCompleted = updateTodo.isCompleted;
        this.todoUpdated.emit(this.todo);
        this.isUpdating = false;
      }
    });
  }

  deleteTodo(): void {
    if (this.isDeleting) return;

    if (confirm('本当に削除しますか？')) {
      this.isDeleting = true;

      this.todoService.deleteTodo(this.todo.id).subscribe({
        next: () => {
          this.todoDeleted.emit(this.todo.id);
          this.isDeleting = false;
        },
        error: (error) => {
          console.error('Error deleting todo:', error);
          this.isDeleting = false;
        }
      });
    }
  }
}
