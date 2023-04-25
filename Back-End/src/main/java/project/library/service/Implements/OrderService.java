package project.library.service.Implements;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.library.DTO.OrderDTO;
import project.library.exception.BadRequestException;
import project.library.exception.ResourceNotFoundException;
import project.library.model.Member;
import project.library.model.Order;
import project.library.repository.BookRepository;
import project.library.repository.OrderRepository;
import project.library.service.Interface.OrderInterface;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService implements OrderInterface {
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final ObjectMapper mapper;

    @Override
    public void saveOrder(OrderDTO orderDTO) throws BadRequestException {
        var book = bookRepository.findById(orderDTO.getBook().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book does not exist"));

        if (!book.isAvailable()){
            throw new BadRequestException("The book is not available");
        }
            book.setAvailable(false);
            bookRepository.save(book);

            LocalDate date = LocalDate.now();

            var order = Order
                    .builder()
                    .issuedDate(date)
                    .returnDate(date.plusDays(28))
                    .book(book)
                    .member(mapper.convertValue(orderDTO.getMember(), Member.class))
                    .active(true)
                    .build();

            orderRepository.save(order);
    }

    @Override
    public OrderDTO findOrderById(Long id) {
        return orderRepository.findById(id)
                .map(order -> mapper.convertValue(order, OrderDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Order with ID: " + id + " does not exist"));
    }

    @Override
    public List<OrderDTO> findAllOrders() {
        var orders = orderRepository.findAll();
        if (orders.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return orders.stream().map(order -> mapper.convertValue(order, OrderDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteOrderById(Long id) {
        orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order with ID: " + id + " does not exist"));
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderDTO> findAllByMemberId(Long id) {
        var orders = orderRepository.findAllByMemberId(id);
        if (orders.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return orders.stream().map(order -> mapper.convertValue(order, OrderDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void returnBookAndUpdateOrder(Long id) {
        var order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The order doest not exist"));
        var book = bookRepository.findById(order.getBook().getId()).get();

        order.setActive(false);
        orderRepository.save(order);

        book.setAvailable(true);
        bookRepository.save(book);

    }


}
