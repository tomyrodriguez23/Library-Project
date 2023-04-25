package project.library.DTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDTO {
    @NotNull(message = "Country - This field can't be empty")
    @NotBlank(message = "Country - This field can't be empty")
    private String country;
    @NotNull(message = "City - This field can't be empty")
    @NotBlank(message = "City - This field can't be empty")
    private String city;
    @NotNull(message = "postCode - This field can't be empty")
    @NotBlank(message = "postCode - This field can't be empty")
    private String postCode;
    @NotNull(message = "line - This field can't be empty")
    @NotBlank(message = "line - This field can't be empty")
    private String line;
}
