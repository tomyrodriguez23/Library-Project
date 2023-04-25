package project.library.DTO;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder

public class OrderDTO {

    private Long id;
    private BookDTO book;
    private MemberDTO member;
    private LocalDate issuedDate;
    private LocalDate returnDate;
    private boolean active;

}
