package project.library.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class AuthResponse {

    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String token;
    private Set<RoleDTO> roles;

}
