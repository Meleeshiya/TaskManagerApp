package com.example.DTSDeveloperTechnicalTest.Dao;

import com.example.DTSDeveloperTechnicalTest.Model.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseDao extends JpaRepository<Case, Integer> {
}
