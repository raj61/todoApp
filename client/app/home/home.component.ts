import { Component, OnInit } from '@angular/core';

import { User, Todo } from '../_models/index';
import { UserService, TodoService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
   
    todo: Todo;
    todos: Todo[] = [];
    myTodos: Todo[] = [];
    otherTodos: Todo[] = [];
    t: string;
    constructor(private userService: UserService, private todoService: TodoService, private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.todo = new Todo();
        this.t="";
    //    this.loadAllUsers();
    //    console.log(this.users);
    }

    ngOnInit() {
        
        this.loadAllTodos();
    }

    

    
    private loadAllTodos(){
        this.todoService.getAll().subscribe(todos => {
                    this.todos = todos; 
                    this.myTodos = [];
                this.otherTodos = [];
                this.todos.forEach(todo => {
                    if( todo.username === this.currentUser.username)
                    {
                        this.myTodos.push(todo);
                    }
                    else{
                        this.otherTodos.push(todo);
                    }
                });
        });
        
    }

    saveTodo(){
        console.log(this.todo);
        this.todo.username = this.currentUser.username;
        this.todo.text = this.t;

     this.todoService.create(this.todo)
            .subscribe(
                data => {
                    this.alertService.success('Todo added successful', true);
                    this.t="";
                    this.loadAllTodos();
                    
                },
                error => {
                    this.alertService.error(error._body);
                    
                });
       
    }

    todoWasDeleted(todo: Todo){
        if(todo.username === this.currentUser.username){
        this.todoService.delete(todo._id).subscribe(() => {
                this.alertService.error("Deleted successfully "+todo.text,true);
                this.loadAllTodos();
        });
        }
        else{
            this.alertService.error("You cannot delete todo created by other user");
        }
    }
}