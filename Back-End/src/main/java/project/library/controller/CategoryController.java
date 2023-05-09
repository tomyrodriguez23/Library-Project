package project.library.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import project.library.DTO.BookDTO;
import project.library.DTO.CategoryDTO;
import project.library.model.Book;
import project.library.model.Category;
import project.library.service.Implements.CategoryService;
import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/categories")
@Tag(name = "Category",
        description = "Category's Operations")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    @Operation(summary = "Save new category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<HttpStatus> saveCategory(@RequestBody @Valid CategoryDTO categoryDTO){
        categoryService.saveCategory(categoryDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping
    @Operation(summary = "Update category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Category updated succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)
    })

    public ResponseEntity<HttpStatus> updateCategory(@RequestBody @Valid CategoryDTO categoryDTO){
        categoryService.updateCategory(categoryDTO);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Search category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category found succesfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)
    })

    public ResponseEntity<CategoryDTO> findCategoryById(@PathVariable Long id){
        var category = categoryService.findCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }


    @GetMapping
    @Operation(summary = "List all categories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Categories not found", content = @Content)
    })

    public ResponseEntity<List<CategoryDTO>> findAllLibraries(){
        var categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category successfully deleted", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Category not Found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> deleteCategoryById(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/random")
    @Operation(summary = "List 8 categories random")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Categories not found", content = @Content)
    })

    public ResponseEntity<List<CategoryDTO>> findCategoriesRandom(){
        var categories = categoryService.findCategoriesRandom();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/pages")
    @Operation(summary = "List categories by Page and PageSize")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Category.class))}),
            @ApiResponse(responseCode = "404", description = "Categories not found", content = @Content)
    })
    public ResponseEntity<Page<CategoryDTO>> findAllCategoriesPaginated(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "8") int size){
        var categories = categoryService.findCategories(page, size);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
