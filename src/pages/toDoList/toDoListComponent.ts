import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page3',
  templateUrl: 'toDoListView.html'
})
export class toDoListComponent {
  public tasks: Array<any>;
  public newTask: any;
  public listTitle:string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.listTitle = navParams.get('title');
    this.newTask = this.createEmptyTask();
    this.tasks = [
      {id: 123, description: 'Aepfel', isDone: false},
      {id: 456, description: 'Orangen', isDone: false},
      {id: 789, description: 'Bananen', isDone: false}
    ];
  }

  markAsDone(task) {
    task.isDone = true;
  }

  createTask() {
    this.tasks.push(this.newTask);
    this.newTask = this.createEmptyTask();
  }

  createEmptyTask() {
    return {
      id: Date.now(),
      description: null,
      isDone: false
    };
  }
}
