package project.library.service.Interface;

import org.springframework.data.domain.Page;
import project.library.DTO.CategoryDTO;
import project.library.model.Category;

import java.util.List;

public interface CategoryInterface {

    void saveCategory(CategoryDTO categoryDTO);
    void updateCategory(CategoryDTO categoryDTO);
    CategoryDTO findCategoryById(Long id);
    List<CategoryDTO> findAllCategories();
    void deleteCategoryById(Long id);
    List<CategoryDTO> findCategoriesRandom();

    Page<CategoryDTO> findCategories(int pageNumber, int pageSize);

}
