import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Todo } from '../_models/index';
import { TodoService, AlertService } from '../_services/index';
@Component({
     moduleId: module.id,
    selector: 'todo',
    templateUrl: 'todo.component.html',
    styleUrls:['todo.component.css'],
    inputs: ['todo','showAuthor'],
    outputs: ['onTodoDeleted']
})

export class todoComponent implements OnInit {

    onTodoDeleted: EventEmitter<Todo>;
    todo: Todo;
    showAuthor: boolean = false;
    constructor(private todoService: TodoService,private alertService: AlertService){
        this.onTodoDeleted = new EventEmitter<Todo>();
    }
    
    ngOnInit(){

    }
    delete(){
        this.onTodoDeleted.emit(this.todo);
    }

}