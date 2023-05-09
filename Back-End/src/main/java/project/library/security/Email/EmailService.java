package project.library.security.Email;//package project.library.security.Email;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import project.library.service.Implements.PdfGeneratorService;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class EmailService implements EmailSender{

    private final JavaMailSender mailSender;
    private final PdfGeneratorService pdfGeneratorService;

    @Override
    @Async
    public void send(String to, String email) {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("joeslibraryprojectagain@gmail.com");
            mailSender.send(mimeMessage);
        }catch (MessagingException e){
            throw new IllegalStateException("failed to send email");
        }
    }

    @Override
    @Async
    public void sendPdf(String to, String email, String bookName) {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true,"utf-8");
            byte[] attachmentBytes = pdfGeneratorService.generatePdfBytes(bookName);
            helper.addAttachment(bookName + ".pdf", new ByteArrayResource(attachmentBytes));
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Congratulations! Here is your PDF ;)");
            helper.setFrom("joeslibraryprojectagain@gmail.com");
            mailSender.send(mimeMessage);
        }catch (MessagingException | DocumentException e){
            throw new IllegalStateException("failed to send email");
        }
    }

}
