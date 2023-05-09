package project.library.repository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.library.model.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT * FROM CATEGORIES ORDER BY RAND() LIMIT 8", nativeQuery = true)
    List<Category> findCategoriesRandom();

    Page<Category> findAll(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Orders o WHERE o.book_id IN (SELECT b.id FROM Books b WHERE b.category_id = :categoryId)", nativeQuery = true)
    void deleteOrdersByCategoryId(@Param("categoryId") Long categoryId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Books b WHERE b.category_id = :categoryId", nativeQuery = true)
    void deleteBooksByCategoryId(@Param("categoryId") Long categoryId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Categories c WHERE c.id = :categoryId", nativeQuery = true)
    void deleteCategoryById(@Param("categoryId") Long categoryId);

    default void deleteCategoryWithBooks(Long categoryId) {
        deleteOrdersByCategoryId(categoryId);
        deleteBooksByCategoryId(categoryId);
        deleteCategoryById(categoryId);
    }

}
