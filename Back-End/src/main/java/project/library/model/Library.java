package project.library.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Entity
@Table(name = "Libraries")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Library {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotBlank(message = "This field can't be empty")
    private String name;

    @Column
    @NotBlank(message = "This field can't be empty")
    private String phoneNumber;

    @Column
    @NotBlank(message = "This field can't be empty")
    private String imageUrl;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "address_id", referencedColumnName = "id",nullable = false)
    private Address address;

    @OneToMany(mappedBy = "library")
    private Set<Book> books;

    @OneToMany(mappedBy = "library")
    private Set<Member> members;

}
