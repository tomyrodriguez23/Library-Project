package project.library.service.Interface;

import com.itextpdf.text.DocumentException;

import java.io.IOException;

public interface PdfGeneratorInterface {

    byte[] generatePdfBytes(String bookName) throws IOException, DocumentException;
}
