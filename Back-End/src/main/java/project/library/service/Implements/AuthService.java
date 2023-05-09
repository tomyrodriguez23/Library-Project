package project.library.service.Implements;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.library.DTO.AuthRequest;
import project.library.DTO.AuthResponse;
import project.library.DTO.MemberDTO;
import project.library.DTO.RoleDTO;
import project.library.exception.BadRequestException;
import project.library.exception.NotAuthorizedException;
import project.library.exception.ResourceNotFoundException;
import project.library.model.Address;
import project.library.model.Member;
import project.library.model.Role;
import project.library.repository.AddressRepository;
import project.library.repository.LibraryRepository;
import project.library.repository.MemberRepository;
import project.library.repository.RoleRepository;
import project.library.security.Email.EmailSender;
import project.library.security.UserSecurity.model.MemberSecurity;
import project.library.security.config.JwtService;
import project.library.security.token.ConfirmationToken;
import project.library.security.token.ConfirmationTokenService;
import project.library.service.Interface.AuthInterface;
import project.library.service.Interface.MemberInterface;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthInterface {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final RoleRepository roleRepository;
    private final LibraryRepository libraryRepository;
    private final ObjectMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;

    @Override
    public String signUpMember(MemberDTO memberDTO) {

        if (memberRepository.findByEmail(memberDTO.getEmail()).isPresent()){
            throw new BadRequestException("The user has been registred, try other email");
        }

        var memberRole = roleRepository.findById(1L).get();
        var roles = new HashSet<Role>();
        roles.add(memberRole);

        var library = libraryRepository.findById(1L).get();

        var address = Address
                .builder()
                .country(memberDTO.getAddress().getCountry())
                .city(memberDTO.getAddress().getCity())
                .postCode(memberDTO.getAddress().getPostCode())
                .line(memberDTO.getAddress().getLine())
                .build();

        var addressSaved = addressRepository.save(address);

        var member = Member
                .builder()
                .name(memberDTO.getName())
                .lastName(memberDTO.getLastName())
                .email(memberDTO.getEmail())
                .password(passwordEncoder.encode(memberDTO.getPassword()))
                .address(addressSaved)
                .library(library)
                .roles(roles)
                .enabled(false)
                .locked(false)
                .build();

       memberRepository.save(member);


        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                member
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

       String link = "http://localhost:8080/api/v1/auth/confirm?token=" + token;
       emailSender.send(memberDTO.getEmail(),buildEmail(memberDTO.getName(), link));

        return token;
    }

    @Override
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        memberRepository.enableMember(confirmationToken.getMember().getEmail());
        return "Your email has ben confirmed successfully!!";
    }

    @Override
    public AuthResponse logIn(AuthRequest request) {

        var member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("The email is not registred"));

        if (!member.getEnabled()){
            throw new NotAuthorizedException("Your email is not verified");
        }

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        }catch (RuntimeException e){
            throw new BadRequestException("The password is incorrect");
        }

        var user = new MemberSecurity(member);
        var jwt =  jwtService.generateToken(user);

        return AuthResponse
                .builder()
                .id(member.getId())
                .name(member.getName())
                .lastName(member.getLastName())
                .email(member.getEmail())
                .token(jwt)
                .roles(member.getRoles().stream().map(role -> mapper.convertValue(role, RoleDTO.class)).collect(Collectors.toSet()))
                .build();
    }

    @Override
    public String sendEmail(String email) {
        var member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Member with email: " + email + " does not exist"));

        if (!member.getEnabled()){

            String token = UUID.randomUUID().toString();

            ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    member
            );

            confirmationTokenService.saveConfirmationToken(confirmationToken);

            String link = "http://localhost:8080/api/v1/auth/confirm?token=" + token;
            emailSender.send(member.getEmail(),buildEmail(member.getName(), link));

            return "Email sent Succesfully";
        }else{
            throw new BadRequestException("Your email is already verified");
        }
    }

    private String buildEmail(String name, String link) {
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
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
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
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
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
