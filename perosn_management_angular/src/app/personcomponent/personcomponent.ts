import { Component, computed, OnInit, signal } from '@angular/core';
import { Person } from '../services/person';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persons } from '../model/person.model';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-personcomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personcomponent.html',
  styleUrl: './personcomponent.css'
})
export class Personcomponent implements OnInit{

  personForm!: FormGroup;

  editMode = signal<boolean>(false);
  editPersonId = signal<number | null>(null);

  persons = computed(() => this.personService.persons());
  loading = computed(() => this.personService.loading());

  animals = ['CAT', 'DOG', 'TIGER', 'LION', 'HORSE'];
  genders = ['MALE', 'FEMALE', 'OTHER'];

  constructor(
    private fb: FormBuilder,
    private personService: Person,
  ) {}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      gender: ['MALE', Validators.required],
      age: [0, [Validators.required, Validators.min(1)]],
      animal: ['', Validators.required]
    });

    this.loadPersons();

    this.personForm.reset();
    
  }


  loadPersons(){
    this.personService.loadAll();
  }

  showModal() {
    this.editMode.set(false);
    this.editPersonId.set(null);
    this.personForm.reset({ gender: 'MALE', animal: '' });

    const modalElemet = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalElemet!);
    modal.show();
  }


 onSubmit() {
  if (this.personForm.invalid) return;

  const person: Persons = this.personForm.value;

  if (this.editMode()) {
    this.personService.updatePerson(this.editPersonId()!, person);
    this.editMode.set(false);
    this.editPersonId.set(null);
  } else {
    this.personService.createPerson(person);
  }

  this.personForm.reset();
  const modalElemet = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalElemet!);
  modal?.hide();
}


  onEdit(p: Persons) {
    this.editMode.set(true);
    this.editPersonId.set(p.id!);
    this.personForm.patchValue(p);

    const modalElemet  = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalElemet!);
    modal.show();
  }

  confirmDelete(id: number) {
  const confirmed = window.confirm('Are you sure you want to delete this person?');
  if (confirmed) {
    this.onDelete(id);
  } else {
    console.log('Delete cancelled');
  }
}

  onDelete(id: number) {
    this.personService.deletePerson(id);
  }
}
