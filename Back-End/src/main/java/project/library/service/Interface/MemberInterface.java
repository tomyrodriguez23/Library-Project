package project.library.service.Interface;

import project.library.DTO.AuthRequest;
import project.library.DTO.AuthResponse;
import project.library.DTO.MemberDTO;
import project.library.exception.BadRequestException;

import java.util.List;

public interface MemberInterface {
    void updateMember(MemberDTO memberDTO);
    MemberDTO findMemberById(Long id);
    List<MemberDTO> findAllMembers();
    void deleteMemberById(Long id);

}
