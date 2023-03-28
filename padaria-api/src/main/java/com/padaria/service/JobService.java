package com.padaria.service;

import com.padaria.dto.JobDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.job.JobModel;
import com.padaria.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Transactional
    public JobDTO findById(Long id) {
        JobModel jobModel = jobRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return jobModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<JobDTO>> findALl() {
        List<JobModel> jobModels = jobRepository.findAll();
        List<JobDTO> jobDTOS = new ArrayList<>();
        jobModels.stream().forEach(t -> jobDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<JobDTO>>(jobDTOS, HttpStatus.OK);
    }

    @Transactional
    public JobDTO create(JobDTO jobDTO) {
        JobModel jobModel = jobRepository.save(jobDTO.convertDTOToEntity());
        return jobModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<JobDTO> delete(Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<JobDTO> update(JobDTO jobDTO) {
        JobModel jobModel = jobRepository.findById(jobDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + jobDTO.getId())
        );

        JobDTO dto = jobModel.convertEntityToDTO();
        dto.setName(jobDTO.getName());
        jobRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<JobDTO>(dto, HttpStatus.OK);
    }

}
