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
import project.library.repository.MemberRepository;
import project.library.repository.OrderRepository;
import project.library.security.Email.EmailService;
import project.library.service.Interface.OrderInterface;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService implements OrderInterface {
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final ObjectMapper mapper;
    private final EmailService emailService;

    @Override
    public void saveOrder(OrderDTO orderDTO) throws BadRequestException {
        var book = bookRepository.findById(orderDTO.getBook().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book does not exist"));

        var member = memberRepository.findById(orderDTO.getMember().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Member does not exist"));

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

            emailService.sendPdf(member.getEmail(), buildEmail(book.getBookName(), member.getName()), book.getBookName());
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

        LocalDate date = LocalDate.now();

        order.setActive(false);
        order.setReturnDate(date);
        orderRepository.save(order);

        book.setAvailable(true);
        bookRepository.save(book);

    }


    private String buildEmail(String bookName, String name) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Check the PDF</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Book: " + bookName + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for choosing Joe's Library for reading!! </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> </p></blockquote>\n See you soon, "+ name +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }


}
