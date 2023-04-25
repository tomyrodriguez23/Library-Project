package project.library.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
public class IllegalStateException extends RuntimeException {
    public IllegalStateException(String mensaje) {
        super(mensaje);
    }
}
