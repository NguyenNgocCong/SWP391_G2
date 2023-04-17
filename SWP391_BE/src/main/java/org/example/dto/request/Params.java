package org.example.dto.request;

import lombok.Data;

@Data
public class Params {
    private long category;
    private Boolean active;
    private int status;
    private String keyword;
}
