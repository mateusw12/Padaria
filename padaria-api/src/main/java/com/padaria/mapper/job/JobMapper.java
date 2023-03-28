package com.padaria.mapper.job;

import com.padaria.dto.job.JobDTO;
import com.padaria.model.job.JobModel;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public JobDTO toDTO(JobModel jobModel) {
        if (jobModel == null) {
            return null;
        }
        return new JobDTO(
                jobModel.getId(),
                jobModel.getName()
        );
    }

    public JobModel toEntity(JobDTO jobDTO) {

        if (jobDTO == null) {
            return null;
        }

        JobModel jobModel = new JobModel();
        if (jobDTO.id() != null) {
            jobModel.setId(jobDTO.id());
        }
        jobModel.setName(jobDTO.name());
        return jobModel;
    }

}
