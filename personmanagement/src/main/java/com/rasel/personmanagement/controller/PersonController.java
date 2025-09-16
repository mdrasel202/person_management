package com.rasel.personmanagement.controller;

import com.rasel.personmanagement.model.Person;
import com.rasel.personmanagement.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    //Get All
    @GetMapping
    public ResponseEntity<List<Person>> getAll(){
        return ResponseEntity.ok(personService.getAllPerson());
    }

    //Get By ID
    @GetMapping("/{id}")
    public ResponseEntity<Person> getById(@PathVariable Long id){
        Person person = personService.getById(id);
        return ResponseEntity.ok(person);
    }

    //Create
    @PostMapping
    public ResponseEntity<Person> createPerson(@RequestBody Person person){
        Person persons = personService.createPerson(person);
        return ResponseEntity.ok(persons);
    }

    //Update
    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody Person person){
        Person person1 = personService.updatePerson(id, person);
        return ResponseEntity.ok(person1);
    }

    //Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Person> deleteById(@PathVariable Long id){
        personService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
