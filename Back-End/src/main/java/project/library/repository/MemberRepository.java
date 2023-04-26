package project.library.repository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.library.model.Member;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Member m " +
            "SET m.enabled = TRUE WHERE m.email = ?1")
    int enableMember(String email);
}
