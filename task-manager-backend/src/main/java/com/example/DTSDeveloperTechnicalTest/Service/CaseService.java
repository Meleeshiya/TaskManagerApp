package com.example.DTSDeveloperTechnicalTest.Service;

import com.example.DTSDeveloperTechnicalTest.Model.Case;

import java.util.List;

public interface CaseService {

    Case createCase(Case newCase);

    Case getCaseById(int id);

    List<Case> getAllCases();

    Case updateCaseStatus(int id, String newStatus);

    void deleteCase(int id);
}
