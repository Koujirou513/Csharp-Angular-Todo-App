import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'TodoApp';
  todos: Todo[] = [];
  newTodo: Todo = {
    id: 0,
    title: '',
    description: '',
    isCompleted: false,
    createdAt: new Date()
  };

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
      this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      (todos) => {
        this.todos = todos;
      },
      (error) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  addTodo(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.createTodo(this.newTodo).subscribe(
        (todo) => {
          this.todos.push(todo);
          this.resetNewTodo();
        },
        (error) => {
          console.error('Error creating todo:', error);
        }
      );
    }
  }

  toggleComplete(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo.id, todo).subscribe(
      () => {
        console.log('Todo updated successfully');
      },
      (error) => {
        console.error('Error updating todo:', error);
        todo.isCompleted = !todo.isCompleted;
      }
    );
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  private resetNewTodo(): void {
    this.newTodo = {
      id: 0,
      title: '',
      description: '',
      isCompleted: false,
      createdAt: new Date()
    };
  }
}
