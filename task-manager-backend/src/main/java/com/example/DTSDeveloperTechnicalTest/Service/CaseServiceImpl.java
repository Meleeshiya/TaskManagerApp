package com.example.DTSDeveloperTechnicalTest.Service;

import com.example.DTSDeveloperTechnicalTest.Dao.CaseDao;
import com.example.DTSDeveloperTechnicalTest.Model.Case;
import com.example.DTSDeveloperTechnicalTest.Model.CaseStatus;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseServiceImpl implements CaseService {

    private final CaseDao caseDao;

    public CaseServiceImpl(CaseDao caseDao) {
        this.caseDao = caseDao;
    }

    @Override
    public Case createCase(Case newCase) {
        return caseDao.save(newCase);
    }

    @Override
    public Case getCaseById(int id) {
        Optional<Case> optionalCase = caseDao.findById(id);
        if (optionalCase.isPresent()) {
            return optionalCase.get();
        } else {
            throw new EntityNotFoundException("Case not found with ID: " + id);
        }
    }

    @Override
    public List<Case> getAllCases() {
        return caseDao.findAll();
    }

    @Override
    public Case updateCaseStatus(int id, String newStatus) {
        Case existingCase = getCaseById(id);

        // Check if the new status is valid
        if (CaseStatus.isValidStatus(newStatus)) {
            existingCase.setStatus(CaseStatus.valueOf(newStatus));
            return caseDao.save(existingCase);
        } else {
            // Handle invalid status (you could throw an exception or return a response with an error message)
            throw new IllegalArgumentException("Invalid status: " + newStatus);
        }
    }

    @Override
    public void deleteCase(int id) {
        if (!caseDao.existsById(id)) {
            throw new EntityNotFoundException("Case not found with ID: " + id);
        }
        caseDao.deleteById(id);
    }
}
