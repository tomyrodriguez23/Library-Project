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
import org.springframework.web.bind.annotation.*;
import project.library.DTO.BookDTO;
import project.library.DTO.CategoryDTO;
import project.library.model.Book;
import project.library.service.Implements.BookService;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/books")
@Tag(name = "Book",
        description = "Book's Operations")
public class BookController {
    private final BookService bookService;

    @PostMapping
    @Operation(summary = "Save new book")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Book saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<HttpStatus> saveBook(@RequestBody @Valid BookDTO bookDTO){
        bookService.saveBook(bookDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping
    @Operation(summary = "Update book")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Book updated succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Book not found", content = @Content)
    })

    public ResponseEntity<HttpStatus> updateBook(@RequestBody @Valid BookDTO bookDTO){
        bookService.updateBook(bookDTO);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Search book by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found succesfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = BookDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Book not found", content = @Content)
    })

    public ResponseEntity<BookDTO> findBookById(@PathVariable Long id){
        var book = bookService.findBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }


    @GetMapping
    @Operation(summary = "List all books")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = BookDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Books not found", content = @Content)
    })

    public ResponseEntity<List<BookDTO>> findAllBooks(){
        var books = bookService.findAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete book by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book successfully deleted", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Book not Found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> deleteBookById(@PathVariable Long id){
        bookService.deleteBookById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/random")
    @Operation(summary = "List 12 books random")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Books not found", content = @Content)
    })
    public ResponseEntity<List<BookDTO>> findBooksRandom(){
        var books = bookService.findBooksRandom();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/category/{id}/pages")
    @Operation(summary = "List books by Category paginated")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Books not found", content = @Content)
    })
    public ResponseEntity<Page<BookDTO>> findAllBooksByCategoryIdPaginated(@PathVariable Long id,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "15") int size){
        var books = bookService.findAllByCategoryId(id, page, size);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/pages")
    @Operation(summary = "List books by Page and PageSize")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Book.class))}),
            @ApiResponse(responseCode = "404", description = "Books not found", content = @Content)
    })
    public ResponseEntity<Page<BookDTO>> findAllBooksPaginated(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "15") int size){
        var books = bookService.findBooks(page, size);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }


    @GetMapping("/name/{name}/pages")
    @Operation(summary = "List books by Page and PageSize")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Book.class))}),
            @ApiResponse(responseCode = "404", description = "Books not found", content = @Content)
    })
    public ResponseEntity<Page<BookDTO>> findAllBooksByNamePaginated(@PathVariable String name,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "15") int size){
        var books = bookService.findBooksByName(name, page, size);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

}
