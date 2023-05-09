package project.library.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Entity
@Table(name = "Books")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotBlank
    private String bookName;

    @Column
    @NotBlank
    private String authorName;

    @Column(length = 1000000)
    @NotBlank
    private String description;

    @Column
    @NotNull
    private int pages;

    @Column(length = 10000)
    @NotBlank
    private String imageUrl;

    @Column
    @NotNull
    private boolean available;

    @ManyToOne
    @JoinColumn(name = "library_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
    private Library library;

    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
    private Category category;

    @OneToMany(mappedBy = "book")
    private Set<Order> orders;

}
