package project.library.service.Interface;
import project.library.DTO.RoleDTO;

import java.util.List;

public interface RoleInterface {

    void saveRole(RoleDTO roleDTO);
    void updateRole(RoleDTO roleDTO);
    RoleDTO findRoleById(Long id);
    List<RoleDTO> findAllRoles();
    void deleteRoleById(Long id);

}
