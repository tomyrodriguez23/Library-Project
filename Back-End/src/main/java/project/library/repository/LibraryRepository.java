package project.library.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.library.model.Library;
@Repository
public interface LibraryRepository extends JpaRepository<Library, Long> {
}
