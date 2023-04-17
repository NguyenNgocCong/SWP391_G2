package org.example.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleRequest {
    private String username;
    private String role;

    public RoleRequest(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public RoleRequest() {
    }
}
