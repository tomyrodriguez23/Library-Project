package project.library.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.library.DTO.RoleDTO;
import project.library.service.Implements.RoleService;
import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/roles")
@Tag(name = "Role",
        description = "Role's Operations")
public class RolController {
    private final RoleService roleService;

    @PostMapping
    @Operation(summary = "Save new role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Role saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<HttpStatus> saveRole(@RequestBody @Valid RoleDTO roleDTO){
        roleService.saveRole(roleDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping
    @Operation(summary = "Update role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Role updated succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Role not found", content = @Content)
    })

    public ResponseEntity<HttpStatus> updateRole(@RequestBody @Valid RoleDTO roleDTO){
        roleService.updateRole(roleDTO);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Search role by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role found succesfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = RoleDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Role not found", content = @Content)
    })

    public ResponseEntity<RoleDTO> findRoleById(@PathVariable Long id){
        var role = roleService.findRoleById(id);
        return new ResponseEntity<>(role, HttpStatus.OK);
    }


    @GetMapping
    @Operation(summary = "List all roles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Roles found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = RoleDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Roles not found", content = @Content)
    })

    public ResponseEntity<List<RoleDTO>> findAllRoles(){
        var roles = roleService.findAllRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete role by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role successfully deleted", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Role not Found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> deleteRoleById(@PathVariable Long id){
        roleService.deleteRoleById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
