package project.library.service.Interface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import project.library.DTO.BookDTO;
import project.library.DTO.CategoryDTO;
import project.library.model.Book;

import java.util.List;

public interface BookInterface {

    void saveBook(BookDTO bookDTO);
    void updateBook(BookDTO bookDTO);
    BookDTO findBookById(Long id);
    List<BookDTO> findAllBooks();
    void deleteBookById(Long id);
    List<BookDTO> findBooksRandom();
    Page<BookDTO> findAllByCategoryId(Long id, int pageNumber, int pageSize);

    Page<BookDTO> findBooks(int pageNumber, int pageSize);

    Page<BookDTO> findBooksByName(String name, int pageNumber, int pageSize);

}
