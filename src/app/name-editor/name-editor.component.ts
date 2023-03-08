import { Component } from '@angular/core';
//import FormControl to use forms
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
//we use the FormControl constructor to set an initial value, create a property and instantiate a new FormControl
name = new FormControl('');

//a form control instance provides a setValue() that updates the value of the form control and validates the structure of the value provided against the control's structure. Example: when retrieving data from a backend API or service, we use the setValue() to update the control to its new value, replacing the old value entirely
//example below: the method updateName() when called in the html will set the value of name to 'Nancy'
updateName(){
  this.name.setValue('Nancy');
}
}
