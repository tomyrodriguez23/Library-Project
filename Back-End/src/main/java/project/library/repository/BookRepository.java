package project.library.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.library.model.Book;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "SELECT * FROM BOOKS ORDER BY RAND() LIMIT 12", nativeQuery = true)
    List<Book> findBooksRandom();
    Page<Book> findAllByCategoryId(Long id, Pageable pageable);

}
