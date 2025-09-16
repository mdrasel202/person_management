package com.rasel.personmanagement.repository;

import com.rasel.personmanagement.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
