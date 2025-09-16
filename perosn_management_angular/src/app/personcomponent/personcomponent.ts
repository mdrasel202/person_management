import { Component, computed, OnInit, signal } from '@angular/core';
import { Person } from '../services/person';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persons } from '../model/person.model';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personcomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personcomponent.html',
  // styleUrl: './personcomponent.css'
  styleUrls: ['./personcomponent.css']
})
export class Personcomponent implements OnInit{

  personForm!: FormGroup;

  editMode = signal<boolean>(false);
  editPersonId = signal<number | null>(null);

  persons = computed(() => this.personService.persons());
  loading = computed(() => this.personService.loading());

  animals = ['CAT', 'DOG', 'TIGER', 'ELEPHANT', 'HORSE'];
  genders = ['MALE', 'FEMALE'];

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
      favoriteAnimal: ['CAT', Validators.required]
    });

    this.personService.loadAll();
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

    this.personForm.reset({ gender: 'MALE', favoriteAnimal: 'CAT', age: 0 });
  }

  onEdit(p: Persons) {
    this.editMode.set(true);
    this.editPersonId.set(p.id!);
    this.personForm.patchValue(p);
  }

  onDelete(id: number) {
    this.personService.deletePerson(id);
  }
}
