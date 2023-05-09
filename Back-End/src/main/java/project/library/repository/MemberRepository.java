package project.library.repository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Orders o WHERE o.member_id IN (SELECT m.id FROM Members m WHERE o.member_id = :memberId)", nativeQuery = true)
    void deleteOrdersByMemberId(@Param("memberId") Long memberId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Confirmation_token c WHERE c.member_id IN (SELECT m.id FROM Members m WHERE c.member_id = :memberId)", nativeQuery = true)
    void deleteConfirmationTokensByMemberId(@Param("memberId") Long memberId);

    default void deleteMemberById(Long id){
        deleteOrdersByMemberId(id);
        deleteConfirmationTokensByMemberId(id);
        deleteById(id);
    }
}
