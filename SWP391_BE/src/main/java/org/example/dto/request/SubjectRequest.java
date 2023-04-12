package org.example.dto.request;

import lombok.Data;

@Data
public class SubjectRequest {
    private String code;
    private String name;
    private boolean status;
    private String note;
    private String manager;
    private Long expert;
    private Long categoryId;
}
