import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { toDoListComponent } from '../pages/toDoList/toDoListComponent';
import { welcomeComponent } from '../pages/welcome/welcomeComponent';
import { TodoListService } from '../services/todoListService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = welcomeComponent;

  toDoListen: Array<{title: string}>;

  constructor(public platform: Platform, public todoListService: TodoListService) {
    this.initializeApp();
    this.initializeStorage();
    this.toDoListen = this.todoListService.readToDoLists();
    // this.openPage(this.toDoListen[0]);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  initializeStorage() {
    // used for an example of ngFor and navigation
    this.todoListService.warmupStorage();
  }

  openPage(listToOpen) {
    this.nav.setRoot(toDoListComponent, {todoList: listToOpen});
  }

  onAddTodoListClickHandler() {
    this.todoListService.addToDoList();
    this.toDoListen = this.todoListService.readToDoLists();
  }
}
