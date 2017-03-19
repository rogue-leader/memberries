import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { TodoListService } from '../../services/todoListService';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-page3',
  templateUrl: 'toDoListView.html'
})
export class toDoListComponent {
  // public tasks: Array<any>;
  public newTask: any;
  public todoList: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private todoListService: TodoListService, private toastCtrl: ToastController) {
    this.todoList = navParams.get('todoList');
    this.newTask = this.createEmptyTask();
  }

  markAsDone(task) {
    task.isDone = true;
  }

  createTask() {
    this.todoList.tasks.push(this.newTask);
    this.todoListService.saveToDoList(this.todoList);
    this.newTask = this.createEmptyTask();
  }

  createEmptyTask() {
    return {
      id: Date.now(),
      description: null,
      isDone: false
    };
  }

  onDoneButtonClick(task) {
    this.markAsDone(task);
    this.updateItemList();
    this.showToast();
    this.todoListService.saveToDoList(this.todoList);
    //Später Änderung in localStorage speichern
  }

  updateItemList() {
    let undoneTasks = [];
    for(let task of this.todoList.tasks){
      if(task.isDone != true){
         undoneTasks.push(task);
      }
    }
    this.todoList.tasks = undoneTasks;
  }

showToast() {
  let toast = this.toastCtrl.create({
    message: 'Task is done.',
    duration: 2500
  });
  toast.present();
}

}
