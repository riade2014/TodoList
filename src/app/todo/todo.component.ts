import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../class/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoValue : string = "";
  todoList: Todo[]=[
    {
      titre: "Menage",
      description: "Nettoyer",
      value: false
    },
    {
      titre: "S'appreter",
      description: "pour travailer",
      value: false
    }
  ];

  finishList: Todo[]=[

  ]

  constructor(private modaleService: NgbModal){}

  changeTask(i: number){
    const item = this.todoList.splice(i,1);
    console.log(item);
    this.finishList.push(item[0]);
  }
  
  addTask(){
    this.todoList.push({titre:this.todoValue,description:this.todoValue, value: false});
    this.todoValue="";
  }

  changeFinish(i: number){
    const item = this.finishList.splice(i,1);
    this.todoList.push(item[0]);
  }

  openModal(titre:TemplateRef<Element>, i: number,type: string){
    this.modaleService.open(titre,{ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result)=>{
        if(type == 'todoList'){
          this.todoList.splice(i,1);
        }else{
          this.finishList.splice(i,1)
        }
      },
      (reason)=>{

      }
    )
  }
}
