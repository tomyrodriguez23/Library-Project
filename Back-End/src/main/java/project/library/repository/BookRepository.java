package project.library.repository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.library.model.Book;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "SELECT * FROM BOOKS ORDER BY RAND() LIMIT 12", nativeQuery = true)
    List<Book> findBooksRandom();
    Page<Book> findAllByCategoryId(Long id, Pageable pageable);
    Page<Book> findByBookNameContainingIgnoreCase(String name, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Orders o WHERE o.book_id = :bookId", nativeQuery = true)
    void deleteOrdersByBookId(@Param("bookId") Long categoryId);

}
