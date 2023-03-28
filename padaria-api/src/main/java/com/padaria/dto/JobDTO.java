package com.padaria.dto;

import com.padaria.model.job.JobModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class JobDTO extends RepresentationModel<JobDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @Length(max = 10)
    public String abbreviation;

    public JobModel convertDTOToEntity() {
        return new ModelMapper().map(this, JobModel.class);
    }

}
