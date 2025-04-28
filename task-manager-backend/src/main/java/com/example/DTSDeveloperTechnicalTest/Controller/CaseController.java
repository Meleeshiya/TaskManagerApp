package com.example.DTSDeveloperTechnicalTest.Controller;


import com.example.DTSDeveloperTechnicalTest.Model.Case;
import com.example.DTSDeveloperTechnicalTest.Service.CaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/case-manager-api")
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    // Create a new Case
    @PostMapping("/addCase")
    public ResponseEntity<Case> createCase(@RequestBody Case newCase) {
        Case createdCase = caseService.createCase(newCase);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCase);
    }

    // Retrieve a Case by ID
    @GetMapping("/case/{id}")
    public ResponseEntity<Case> getCaseById(@PathVariable int id) {
        Case foundCase = caseService.getCaseById(id);
        return ResponseEntity.ok(foundCase);
    }

    // Retrieve all Cases
    @GetMapping("/cases")
    public ResponseEntity<List<Case>> getAllCases() {
        List<Case> cases = caseService.getAllCases();
        return ResponseEntity.ok(cases);
    }

    // Update the status of an existing Case
    @PatchMapping("/updatecasestatus/{id}/status")
    public ResponseEntity<Case> updateCaseStatus(@PathVariable int id, @RequestParam String status) {
        Case updatedCase = caseService.updateCaseStatus(id, status);
        return ResponseEntity.ok(updatedCase);
    }

    // Delete a Case
    @DeleteMapping("/deletecase/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable int id) {
        caseService.deleteCase(id);
        return ResponseEntity.noContent().build();
    }
}
