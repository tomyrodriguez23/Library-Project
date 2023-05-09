package project.library.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import project.library.security.token.ConfirmationToken;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Members")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String name;

    @Column(nullable = false)
    @NotBlank
    private String lastName;

    @Column(nullable = false)
    @NotBlank
    @Email
    private String email;

    @ToString.Exclude
    @Column(nullable = false)
    private String password;
    private Boolean locked = false;
    private Boolean enabled = false;
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
    private Address address;

    @OneToMany(mappedBy = "member")
    private Set<Order> orders;

    @OneToMany(mappedBy = "member")
    private Set<ConfirmationToken> confirmationTokens;

    @ManyToOne
    @JoinColumn(name = "library_id", referencedColumnName = "id", nullable = false)
    private Library library;

    @ManyToMany(cascade = CascadeType.MERGE,fetch = FetchType.EAGER)
    @JoinTable(
            name = "roles_users",
            joinColumns = @JoinColumn(name = "member_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();



    public Member(String name, String lastName, String email, String password, Boolean locked, Boolean enabled, Address address, Set<Order> orders, Library library, Set<Role> roles) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.locked = locked;
        this.enabled = enabled;
        this.address = address;
        this.orders = orders;
        this.library = library;
        this.roles = roles;
    }
}
