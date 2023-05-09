package project.library.DTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class MemberDTO {

    private Long id;
    @NotBlank(message = "This field can't be empty")
    private String name;
    @NotBlank(message = "This field can't be empty")
    private String lastName;
    @NotBlank(message = "This field can't be empty")
    private String email;
    private String password;
    @NotNull(message = "This field can't be null")
    private AddressDTO address;

}
