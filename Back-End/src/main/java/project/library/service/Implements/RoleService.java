package project.library.service.Implements;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.library.DTO.RoleDTO;
import project.library.exception.ResourceNotFoundException;
import project.library.model.Role;
import project.library.repository.RoleRepository;
import project.library.service.Interface.RoleInterface;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService implements RoleInterface {

    private final RoleRepository roleRepository;
    private final ObjectMapper mapper;

    @Override
    public void saveRole(RoleDTO roleDTO) {

        var role = Role
                .builder()
                .name(roleDTO.getName())
                .build();

        roleRepository.save(role);
    }
    @Override
    public void updateRole(RoleDTO roleDTO) {
        var role = roleRepository.findById(roleDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Role with ID: " + roleDTO.getId() + " does not exist"));

        var roleUpdate = Role
                .builder()
                .id(roleDTO.getId())
                .name(roleDTO.getName())
                .build();

        roleRepository.save(roleUpdate);
    }
    @Override
    public RoleDTO findRoleById(Long id) {
        return roleRepository.findById(id)
                .map(role -> mapper.convertValue(role, RoleDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Role with ID: " + id + " does not exist"));
    }
    @Override
    public List<RoleDTO> findAllRoles() {
        var roles = roleRepository.findAll();
        if (roles.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return roles.stream().map(role -> mapper.convertValue(role, RoleDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteRoleById(Long id) {
       roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role with ID: " + id + " does not exist"));
       roleRepository.deleteById(id);
    }
}
