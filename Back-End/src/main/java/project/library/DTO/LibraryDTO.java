package project.library.DTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class LibraryDTO {
    private Long id;
    @NotBlank(message = "name - This field can't be empty")
    private String name;
    @NotBlank(message = "phoneNumber - This field can't be empty")
    private String phoneNumber;
    @NotBlank(message = "imageUrl - This field can't be empty")
    private String imageUrl;
    @NotNull(message = "address - This field can't be null")
    private AddressDTO address;
}
