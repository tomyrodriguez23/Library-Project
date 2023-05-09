package project.library.service.Implements;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.library.DTO.*;
import project.library.exception.BadRequestException;
import project.library.exception.NotAuthorizedException;
import project.library.exception.ResourceNotFoundException;
import project.library.model.*;
import project.library.repository.AddressRepository;
import project.library.repository.LibraryRepository;
import project.library.repository.MemberRepository;
import project.library.repository.RoleRepository;
import project.library.security.Email.EmailSender;
import project.library.security.UserSecurity.model.MemberSecurity;
import project.library.security.config.JwtService;
import project.library.security.token.ConfirmationToken;
import project.library.security.token.ConfirmationTokenService;
import project.library.service.Interface.MemberInterface;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class MemberService implements MemberInterface {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final ObjectMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateMember(MemberDTO memberDTO) {
        var member = memberRepository.findByEmail(memberDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Member with ID: " + memberDTO.getId() + " does not exist"));

        var address = Address
                .builder()
                .id(member.getAddress().getId())
                .country(memberDTO.getAddress().getCountry())
                .city(memberDTO.getAddress().getCity())
                .postCode(memberDTO.getAddress().getPostCode())
                .line(memberDTO.getAddress().getLine())
                .build();

        var addressSaved = addressRepository.save(address);

        var memberToUpdateBuilder = Member
                .builder()
                .id(member.getId())
                .name(memberDTO.getName())
                .lastName(memberDTO.getLastName())
                .email(member.getEmail())
                .enabled(member.getEnabled())
                .locked(member.getLocked())
                .roles(member.getRoles())
                .address(addressSaved)
                .library(member.getLibrary());

        if (memberDTO.getPassword() != null){
            memberToUpdateBuilder.password(passwordEncoder.encode(memberDTO.getPassword()));
        }else{
            memberToUpdateBuilder.password(member.getPassword());
        }

        var memberUpdated = memberToUpdateBuilder.build();
        memberRepository.save(memberUpdated);
    }

    @Override
    public MemberDTO findMemberById(Long id) {
        return memberRepository.findById(id)
                .map(member -> mapper.convertValue(member, MemberDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Member with ID: " + id + " does not exist"));
    }

    @Override
    public List<MemberDTO> findAllMembers() {
        var members = memberRepository.findAll();
        if (members.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return members.stream().map(member -> mapper.convertValue(member, MemberDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteMemberById(Long id) {
        memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member with ID: " + id + " does not exist"));
        memberRepository.deleteMemberById(id);
    }


}
