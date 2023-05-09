package project.library.service.Implements;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.library.DTO.BookDTO;
import project.library.DTO.CategoryDTO;
import project.library.DTO.LibraryDTO;
import project.library.exception.ResourceNotFoundException;
import project.library.model.Address;
import project.library.model.Book;
import project.library.model.Category;
import project.library.model.Library;
import project.library.repository.BookRepository;
import project.library.repository.CategoryRepository;
import project.library.service.Interface.CategoryInterface;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService implements CategoryInterface {
    
    private final CategoryRepository categoryRepository;
    private final ObjectMapper mapper;
    @Override
    public void saveCategory(CategoryDTO categoryDTO) {
        var category = Category
                .builder()
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .imageUrl(categoryDTO.getImageUrl())
                .books(new HashSet<>())
                .build();
        
        categoryRepository.save(category);

    }

    @Override
    public void updateCategory(CategoryDTO categoryDTO) {
        var library = categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category with ID: " + categoryDTO.getId() + " does not exist"));
        
        var category = Category
                .builder()
                .id(categoryDTO.getId())
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .imageUrl(categoryDTO.getImageUrl())
                .books(library.getBooks())
                .build();

        categoryRepository.save(category);
    }

    @Override
    public CategoryDTO findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(category -> mapper.convertValue(category, CategoryDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Category with ID: " + id + " does not exist"));
    }

    @Override
    public List<CategoryDTO> findAllCategories() {
        var categories = categoryRepository.findAll();
        if (categories.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return categories.stream().map(category -> mapper.convertValue(category, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with ID: " + id + " does not exist"));
        categoryRepository.deleteCategoryWithBooks(id);
    }

    @Override
    public List<CategoryDTO> findCategoriesRandom() {
        var categories = categoryRepository.findCategoriesRandom();
        if (categories.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return categories.stream().map(category -> mapper.convertValue(category, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<CategoryDTO> findCategories(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var page = categoryRepository.findAll(pageable);

        if (page.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }

        var categoriesDTO = page.getContent().stream()
                .map((category) -> mapper.convertValue(category, CategoryDTO.class))
                .collect(Collectors.toList());

        return new PageImpl<>(categoriesDTO, pageable, page.getTotalElements());
    }


}
