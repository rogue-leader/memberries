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
    console.log(datenListe);
    let liste = JSON.parse(datenListe);

    if(liste == null) {
      liste = [];
      localStorage.setItem('Listenverzeichnis', JSON.stringify('[]'))
    }

    return liste;
  }

  addToDoList() {
    debugger;
    let listen = this.readToDoLists();
    let pushList = this.generateEmptyTodoList();
    let allLists = this.readToDoLists();

    listen.push(pushList);
    let daten = JSON.stringify(listen);
    localStorage.setItem('Listenverzeichnis', daten);
  }

  saveToDoList(todoList) {
    let freshLists = [];
    let allLists = this.readToDoLists();

    if(allLists == null) {
      allLists = [];
    }
    
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
