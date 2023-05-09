package project.library.service.Implements;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.library.DTO.BookDTO;
import project.library.exception.ResourceNotFoundException;
import project.library.model.Book;
import project.library.model.Category;
import project.library.model.Library;
import project.library.repository.BookRepository;
import project.library.repository.LibraryRepository;
import project.library.service.Interface.BookInterface;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService implements BookInterface {

    private final BookRepository bookRepository;
    private final ObjectMapper mapper;
    private final LibraryRepository libraryRepository;

    @Override
    public void saveBook(BookDTO bookDTO) {

        var library = libraryRepository.findById(1L).get();

        var book = Book
                .builder()
                .bookName(bookDTO.getBookName())
                .authorName(bookDTO.getAuthorName())
                .description(bookDTO.getDescription())
                .imageUrl(bookDTO.getImageUrl())
                .pages(bookDTO.getPages())
                .available(true)
                .category(mapper.convertValue(bookDTO.getCategory(), Category.class))
                .library(library)
                .build();

        bookRepository.save(book);
    }

    @Override
    public void updateBook(BookDTO bookDTO) {
        var book = bookRepository.findById(bookDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book with ID: " + bookDTO.getId() + " does not exist"));

        var bookUpdate = Book
                .builder()
                .id(bookDTO.getId())
                .bookName(bookDTO.getBookName())
                .authorName(bookDTO.getAuthorName())
                .description(bookDTO.getDescription())
                .imageUrl(bookDTO.getImageUrl())
                .pages(bookDTO.getPages())
                .available(book.isAvailable())
                .category(mapper.convertValue(bookDTO.getCategory(), Category.class))
                .library(book.getLibrary())
                .build();

        bookRepository.save(bookUpdate);
    }
    @Override
    public BookDTO findBookById(Long id) {
        return bookRepository.findById(id)
                .map(book -> mapper.convertValue(book, BookDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Book with ID: " + id + " does not exist"));
    }

    @Override
    public List<BookDTO> findAllBooks() {
        var books = bookRepository.findAll();
        if (books.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return books.stream().map(book -> mapper.convertValue(book, BookDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteBookById(Long id) {
       bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with ID: " + id + " does not exist"));
       bookRepository.deleteOrdersByBookId(id);
       bookRepository.deleteById(id);
    }

    @Override
    public List<BookDTO> findBooksRandom() {
        var books = bookRepository.findBooksRandom();
        if (books.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return books.stream().map(book -> mapper.convertValue(book, BookDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<BookDTO> findBooks(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var page = bookRepository.findAll(pageable);

        if (page.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }

        var booksDTO = page.getContent().stream()
                .map((book) -> mapper.convertValue(book, BookDTO.class))
                .collect(Collectors.toList());

        return new PageImpl<>(booksDTO, pageable, page.getTotalElements());
    }

    @Override
    public Page<BookDTO> findBooksByName(String name, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var page = bookRepository.findByBookNameContainingIgnoreCase(name, pageable);
        if (page.isEmpty()){
            throw new ResourceNotFoundException("There are no books with that name");
        }
        var booksDTO = page.getContent().stream()
                .map((book) -> mapper.convertValue(book, BookDTO.class))
                .collect(Collectors.toList());

        return new PageImpl<>(booksDTO, pageable, page.getTotalElements());
    }

    @Override
    public Page<BookDTO> findAllByCategoryId(Long id, int pageNumber, int pageSize ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var page = bookRepository.findAllByCategoryId(id, pageable);

        if (page.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }

        var booksDTO = page.getContent().stream()
                .map((book) -> mapper.convertValue(book, BookDTO.class))
                .collect(Collectors.toList());

        return new PageImpl<>(booksDTO, pageable, page.getTotalElements());
    }


}
