package project.library.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotAuthorizedException extends RuntimeException{
    public NotAuthorizedException(String mensaje){
        super(mensaje);
    }
}
