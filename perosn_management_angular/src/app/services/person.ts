import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Persons } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class Person {
     private apiUrl = 'http://localhost:8081/api/person';


  persons = signal<Persons[]>([]);

  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.loading.set(true);
    this.http.get<Persons[]>(this.apiUrl).subscribe({
      next: (res) => this.persons.update(()=> res),
      complete: () => this.loading.update(()=>false),
    });
  }

  createPerson(person: Persons) {
    this.http.post<Persons>(this.apiUrl, person).subscribe((res) => {
      this.persons.update(list => [...list, res]);
    });
  }

  updatePerson(id: number, person: Persons) {
    this.http.put<Persons>(`${this.apiUrl}/${id}`, person).subscribe((res) => {
      this.persons.update(list =>
        list.map(p => (p.id === id ? res : p))
      );
    });
  }

  deletePerson(id: number) {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      this.persons.update(list => list.filter(p => p.id !== id));
    });
  }
}
