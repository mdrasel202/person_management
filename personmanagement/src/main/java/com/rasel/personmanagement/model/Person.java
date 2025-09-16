package com.rasel.personmanagement.model;

import com.rasel.personmanagement.constants.Animal;
import com.rasel.personmanagement.constants.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "P_PERSON")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String fatherName;
    private String motherName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Animal animal;
}
