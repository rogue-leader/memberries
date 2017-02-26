import { Injectable } from '@angular/core';

@Injectable()
export class TodoListService {

  warmupStorage() {
    if(localStorage.getItem('Listenverzeichnis') == null) {
      let initialeListe = [];
      this.saveToDoList(initialeListe);
    }
  }

  readToDoLists(): Array<{id: number, title: string, tasks: any}> {
    let datenListe = localStorage.getItem('Listenverzeichnis');
    let liste = JSON.parse(datenListe);
    return liste;
  }

  addToDoList() {
    let listen = this.readToDoLists();
    let pushList = this.generateEmptyTodoList();
    listen.push(pushList);
    this.saveToDoList(listen);
  }

  saveToDoList(todoList) {
    let freshLists = [];
    let allLists = this.readToDoLists();
    
    for(let list of allLists) {
      if(list.id == todoList.id) {
        freshLists.push(todoList)
      } else {
        freshLists.push(list);
      }
    }

    let daten = JSON.stringify(freshLists);
    localStorage.setItem('Listenverzeichnis', daten);
  }
  
  generateEmptyTodoList() {
    return {
      id:(Date.now()),
      title: 'Neue Liste',
      tasks: [
        {id: Date.now(), description: 'Milch', isDone: false},
        {id: Date.now(), description: 'Kekse', isDone: false}
      ]
    };
  }
}
