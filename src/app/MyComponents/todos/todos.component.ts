import { Component, OnInit } from '@angular/core';
import {Todo} from "./Todos";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor() {
    this.todos = [
      {
        sno : 1,
        work : "first job"

      },
      {
        sno : 2,
        work : "second job"

      },
      {
        sno : 3,
        work : "third job"

      }
    ]
   }

  ngOnInit(): void {
  }

}
