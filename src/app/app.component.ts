import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { toDoListComponent } from '../pages/toDoList/toDoListComponent';
import { welcomeComponent } from '../pages/welcome/welcomeComponent';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = welcomeComponent;

  toDoListen: Array<{title: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.initializeStorage();
    this.toDoListen = this.readToDoLists();
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
    if(localStorage.getItem('Listenverzeichnis') == null) {
      let initialeListe = [];
      this.saveToDoList(initialeListe);
    }
  }

  openPage(toDoList) {
    this.nav.setRoot(toDoListComponent, toDoList);
  }

  readToDoLists(): Array<{title: string}> {
    let datenListe = localStorage.getItem('Listenverzeichnis');
    let liste = JSON.parse(datenListe);
    return liste;
  }

  addToDoList() {
    let listen = this.readToDoLists();
    let pushList = {id:(Date.now()), title: 'Neue Liste'};
    listen.push(pushList);
    this.saveToDoList(listen);
    this.toDoListen = this.readToDoLists();
  }

  saveToDoList(s) {
    let daten = JSON.stringify(s);
    localStorage.setItem('Listenverzeichnis', daten);
  }

  deleteToDoList(outdatedList) {
    let lists = this.readToDoLists();
    let neueListe = [];

    for(let list of lists) { //[a,b,c,d,f]
      let id:any = list['id'];

      if(id != outdatedList.id) {
        neueListe.push(list);
      }
    }

    this.saveToDoList(neueListe);
    this.toDoListen = neueListe;
  }
}
