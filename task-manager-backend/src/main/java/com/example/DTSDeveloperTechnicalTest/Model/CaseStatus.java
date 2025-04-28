package com.example.DTSDeveloperTechnicalTest.Model;

public enum CaseStatus {
    TO_DO,
    IN_PROGRESS,
    ON_HOLD,
    COMPLETED,
    CLOSED,
    CANCELLED;

    // Safe method to check if a status is valid
    public static boolean isValidStatus(String status) {
        for (CaseStatus caseStatus : values()) {
            if (caseStatus.name().equalsIgnoreCase(status)) {
                return true;
            }
        }
        return false;
    }
}

