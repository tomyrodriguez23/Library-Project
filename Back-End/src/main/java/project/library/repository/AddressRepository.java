package project.library.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.library.model.Address;
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
