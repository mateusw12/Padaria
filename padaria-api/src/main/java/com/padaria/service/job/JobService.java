package com.padaria.service.job;

import com.padaria.dto.job.JobDTO;
import com.padaria.mapper.job.JobMapper;
import com.padaria.repository.job.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;
    @Transactional
    public JobDTO findById(Long id) {
        return jobRepository.findById(id).map(jobMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Job not found" + id));
    }

    @Transactional
    public List<JobDTO> findALl() {
        return jobRepository.findAll()
                .stream()
                .map(jobMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobDTO create(JobDTO jobDTO) {
        return jobMapper.toDTO(jobRepository.save(jobMapper.toEntity(jobDTO)));
    }

    @Transactional
    public void delete(Long id) {
        jobRepository.delete(jobRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Job not found" + id)));
    }

    @Transactional
    public JobDTO update(Long id, JobDTO jobDTO) {
        return jobRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(jobDTO.name());
                    return jobMapper.toDTO(jobRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Job not found" + id));
    }

}
