package project.library.service.Implements;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import project.library.service.Interface.PdfGeneratorInterface;
import java.io.ByteArrayOutputStream;
@Service
public class PdfGeneratorService implements PdfGeneratorInterface {

    @Override
    @Async
    public byte[] generatePdfBytes(String bookName) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, baos);
            document.open();
            Paragraph title = new Paragraph(bookName);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            Paragraph paragraph = new Paragraph("This should be the book content");
            document.add(paragraph);
        } catch (DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
        return baos.toByteArray();
    }
}
