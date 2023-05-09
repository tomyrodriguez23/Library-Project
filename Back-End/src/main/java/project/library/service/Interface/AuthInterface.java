package project.library.service.Interface;

import project.library.DTO.AuthRequest;
import project.library.DTO.AuthResponse;
import project.library.DTO.MemberDTO;

import java.util.List;

public interface AuthInterface {
    String signUpMember(MemberDTO memberDTO);
    String confirmToken(String token);
    AuthResponse logIn(AuthRequest request);
    String sendEmail (String email);
}
