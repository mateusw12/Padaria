package com.padaria.repository.settings;

import com.padaria.model.settings.SettingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<SettingModel, Long> {

}
