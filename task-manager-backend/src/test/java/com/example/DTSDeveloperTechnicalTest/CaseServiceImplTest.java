package com.example.DTSDeveloperTechnicalTest;

import com.example.DTSDeveloperTechnicalTest.Dao.CaseDao;
import com.example.DTSDeveloperTechnicalTest.Model.Case;
import com.example.DTSDeveloperTechnicalTest.Model.CaseStatus;
import com.example.DTSDeveloperTechnicalTest.Service.CaseServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CaseServiceImplTest {

    private CaseDao caseDao;
    private CaseServiceImpl caseService;

    @BeforeEach
    void setUp() {
        caseDao = mock(CaseDao.class);
        caseService = new CaseServiceImpl(caseDao);
    }

    @Test
    void createCase_shouldSaveCase() {
        Case newCase = new Case();
        when(caseDao.save(newCase)).thenReturn(newCase);

        Case createdCase = caseService.createCase(newCase);

        assertEquals(newCase, createdCase);
        verify(caseDao, times(1)).save(newCase);
    }

    @Test
    void getCaseById_shouldReturnCase_whenCaseExists() {
        Case foundCase = new Case();
        when(caseDao.findById(1)).thenReturn(Optional.of(foundCase));

        Case result = caseService.getCaseById(1);

        assertEquals(foundCase, result);
        verify(caseDao, times(1)).findById(1);
    }

    @Test
    void getCaseById_shouldThrowException_whenCaseNotFound() {
        when(caseDao.findById(1)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            caseService.getCaseById(1);
        });

        assertEquals("Case not found with ID: 1", exception.getMessage());
    }

    @Test
    void getAllCases_shouldReturnAllCases() {
        List<Case> caseList = Arrays.asList(new Case(), new Case());
        when(caseDao.findAll()).thenReturn(caseList);

        List<Case> result = caseService.getAllCases();

        assertEquals(2, result.size());
        verify(caseDao, times(1)).findAll();
    }

    @Test
    void updateCaseStatus_shouldUpdateStatus_whenValidStatus() {
        Case existingCase = new Case();
        existingCase.setId(1);
        existingCase.setStatus(CaseStatus.COMPLETED);

        when(caseDao.findById(1)).thenReturn(Optional.of(existingCase));
        when(caseDao.save(any(Case.class))).thenAnswer(i -> i.getArguments()[0]);

        Case updatedCase = caseService.updateCaseStatus(1, "CLOSED");

        assertEquals(CaseStatus.CLOSED, updatedCase.getStatus());

        ArgumentCaptor<Case> captor = ArgumentCaptor.forClass(Case.class);
        verify(caseDao).save(captor.capture());
        assertEquals(CaseStatus.CLOSED, captor.getValue().getStatus());
    }

    @Test
    void deleteCase_shouldDelete_whenCaseExists() {
        when(caseDao.existsById(1)).thenReturn(true);

        caseService.deleteCase(1);

        verify(caseDao, times(1)).deleteById(1);
    }

    @Test
    void deleteCase_shouldThrowException_whenCaseNotFound() {
        when(caseDao.existsById(1)).thenReturn(false);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            caseService.deleteCase(1);
        });

        assertEquals("Case not found with ID: 1", exception.getMessage());
    }
}

