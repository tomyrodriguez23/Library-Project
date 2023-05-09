package project.library.DTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDTO {

    private Long id;
    @NotBlank(message = "This field can't be empty")
    private String bookName;
    @NotBlank(message = "This field can't be empty")
    private String authorName;
    @NotBlank(message = "This field can't be empty")
    private String description;
    @NotNull(message = "This field can't be empty")
    private int pages;
    @NotBlank(message = "This field can't be empty")
    private String imageUrl;
    @NotNull(message = "This field can't be null")
    private CategoryDTO category;
    private boolean available;
}
