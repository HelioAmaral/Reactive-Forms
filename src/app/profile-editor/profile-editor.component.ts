import { Component } from '@angular/core';
//import FormGroups and FormControl to use forms with more than one field
import { FormControl, FormGroup } from '@angular/forms';
//Import FormBuilder to to use its methods
import { FormBuilder } from '@angular/forms';
//import validators to validate forms
import { Validators } from '@angular/forms';
//import formArryay for managing a number of unnamed controls
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent {
  //create an instance of FormGroup called profileForm
  //when creating an instance of FormGroup we provide the constructor with an object of named keys mapped to their control. This because while FormControl referes to one input field, formGroup refers to several fields
  /*profileForm = new FormGroup({*/
  //we add two formControls instances inside the formGroup, meaning two input fields for the profile form. Key/value pairs
  /*firstName: new FormControl(''),
    lastName: new FormControl(''),*/

  //Using nested groups instances allows to break large forms groups into smaller and manageable ones.
  //Address nested group: Even though address is a child of the overall profileForm element in the FormGroup, the same rules apply with value and status changes. Changes in status and value from the nested group propagate to the parent FormGroup, maintaining consistency.
  /*address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postCode: new FormControl('')
    })
  })*/

  /******* REFACTORING THE CODE ABOVE WITH FORMBUILDER */
  /********** FORM BUILDER *************/
  //FormBuilder provides methods for generating controls, this replaces the manually way to crete formControl instances, to use it, we import it and inject it with the constructor
  constructor(private formBuilder: FormBuilder) {}

  //the FormBuilder has 3 methods: control(), group(), and array() these are used for generating instances in our component classes.
  //Form validation is used to ensure that user input is complete and correct. Reactive forms include a set of validator functions, these functions receive a control to validate against and return an error object or a null value based on the validation check
  profileForm = this.formBuilder.group({
    //we make the firstName as a required field
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      country: [''],
      postCode: [''],
    }),
    //initialize a formArray: an alternative to FormGroup for managing any number of unnamed controls. We can dynamically insert and remove controls from form array instances. We don't need to define a key for each control by name. A great option if we don't know the number of child values in advance.
    aliases: this.formBuilder.array([
      //the aliases control in the form group instance is now populated with a single control until more are added dynamically
      this.formBuilder.control('')
    ]),
  });

  //a getter provides access to the aliases in the form array instance compared to repeating the profileForm.get() method to get each instance
  get aliases(){
    return this.profileForm.get('aliases') as FormArray;
  }

  //define a method to dynamically insert an alias control into the alia's form array. The FormArray.push() inserts the control as a new item in the array. In the template, each control is displayed as a separate input field
  addAlias(){
    this.aliases.push(this.formBuilder.control(''));
  }


  
  //In formGroups that contain multiple controls, we can update parts or all of it. Theres 2 ways to update specific parts of a formControl data model. setValue() and pacthValue() - the patchValue() replace any properties deifned in the object that have changed in the form model
  //once the user clicks the button "Update" the profileForm is updated with new values for firstName and street address.
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  //the onSubmit() captures the current value of profileForm. Use EventEmitter tp keep the form encapsulated and to provide the form value outside the component
  onSubmit() {
    //TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
