package project.library.service.Implements;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import project.library.exception.ResourceNotFoundException;
import project.library.model.*;
import project.library.repository.AddressRepository;
import project.library.repository.LibraryRepository;
import project.library.repository.MemberRepository;
import project.library.repository.RoleRepository;
import project.library.security.UserSecurity.model.MemberSecurity;
import project.library.security.config.JwtService;
import project.library.service.Interface.MemberInterface;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class MemberService implements MemberInterface {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final RoleRepository roleRepository;
    private final LibraryRepository libraryRepository;
    private final ObjectMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public void saveMember(MemberDTO memberDTO) {

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
                .build();

       memberRepository.save(member);
    }

    @Override
    public void updateMember(MemberDTO memberDTO) {
        var member = memberRepository.findById(memberDTO.getId())
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

        var memberToUpdate = Member
                .builder()
                .id(memberDTO.getId())
                .name(memberDTO.getName())
                .lastName(memberDTO.getLastName())
                .email(memberDTO.getEmail())
                .password(memberDTO.getPassword())
                .roles(member.getRoles())
                .address(addressSaved)
                .library(member.getLibrary())
                .build();

        memberRepository.save(memberToUpdate);
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
        memberRepository.deleteById(id);
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Wrong credentials"));
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
}
