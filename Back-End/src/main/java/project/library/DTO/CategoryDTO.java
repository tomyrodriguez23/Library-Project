package project.library.DTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
@Data
@Builder

public class CategoryDTO {
    private Long id;
    @NotBlank(message = "This field can't be empty")
    private String name;
    @NotBlank(message = "This field can't be empty")
    private String description;
    @NotBlank(message = "This field can't be empty")
    private String imageUrl;
    
}
