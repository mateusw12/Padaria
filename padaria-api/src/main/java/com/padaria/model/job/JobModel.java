package com.padaria.model.job;

import com.padaria.dto.job.JobDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Data
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