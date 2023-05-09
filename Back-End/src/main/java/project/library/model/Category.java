package project.library.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Entity
@Table(name = "Categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotBlank
    private String name;

    @Column(length = 1000000)
    @NotBlank
    private String description;

    @Column(length = 10000)
    @NotBlank
    private String imageUrl;

    @OneToMany(mappedBy = "category",cascade = CascadeType.REMOVE)
    private Set<Book> books;

}
