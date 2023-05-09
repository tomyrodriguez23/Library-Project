package project.library.security.Email;

public interface EmailSender {

    void send(String to, String email);
    void sendPdf(String to, String email, String bookName);

}
