package project.library.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.library.model.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT * FROM CATEGORIES ORDER BY RAND() LIMIT 8", nativeQuery = true)
    List<Category> findCategoriesRandom();

    Page<Category> findAll(Pageable pageable);

}
