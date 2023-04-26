package project.library.security.Email;//package project.library.security.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class EmailService implements EmailSender{

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String email) {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage, "utf-8"
            );
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("tomyrodriguez2305@hotmail.com");
            mailSender.send(mimeMessage);
        }catch (MessagingException e){
            throw new IllegalStateException("failed to send email");
        }
    }


//    @Async
//    public void sendEmail(String to, String subject, String body){
//        SimpleMailMessage mail = new SimpleMailMessage();
//        mail.setFrom("joeslibraryproject@gmail.com");
//        mail.setTo(to);
//        mail.setSubject(subject);
//        mail.setText(body);
//        mailSender.send(mail);
//    }

}
