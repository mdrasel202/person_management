package com.rasel.personmanagement.service;

import com.rasel.personmanagement.model.Person;
import com.rasel.personmanagement.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAllPerson() {
        return personRepository.findAll();
    }

    public Person getById(Long id) {
        return personRepository.findById(id).orElse(null);
    }

    public Person createPerson(Person person) {
        return personRepository.save(person);
    }

    public Person updatePerson(Long id, Person person) {
        return personRepository.findById(id).map(persons->{
            persons.setName(person.getName());
            persons.setFatherName(person.getFatherName());
            persons.setMotherName(person.getMotherName());
            persons.setGender(person.getGender());
            persons.setAge(person.getAge());
            persons.setAnimal(person.getAnimal());
            return personRepository.save(persons);
        }).orElseThrow(() -> new RuntimeException("Person not found with id " + id));
    }

    public void deleteById(Long id) {
        personRepository.deleteById(id);
    }
}
