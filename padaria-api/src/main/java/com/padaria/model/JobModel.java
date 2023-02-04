package com.padaria.model;

import com.padaria.dto.JobDTO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity(name= "cargo")
public class JobModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    public JobDTO convertEntityToDTO() {
        return new ModelMapper().map(this, JobDTO.class);
    }

}