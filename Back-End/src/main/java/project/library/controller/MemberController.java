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
import project.library.DTO.AuthRequest;
import project.library.DTO.AuthResponse;
import project.library.DTO.MemberDTO;
import project.library.exception.BadRequestException;
import project.library.service.Implements.MemberService;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
@Tag(name = "Member",
        description = "Member's Operations")
public class MemberController {
    private final MemberService memberService;



    @PutMapping
    @Operation(summary = "Update member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Member updated succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Member not found", content = @Content)
    })

    public ResponseEntity<HttpStatus> updateMember(@RequestBody @Valid MemberDTO memberDTO){
        memberService.updateMember(memberDTO);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Search member by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Member found succesfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MemberDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Member not found", content = @Content)
    })

    public ResponseEntity<MemberDTO> findMemberById(@PathVariable Long id){
        var member = memberService.findMemberById(id);
        return new ResponseEntity<>(member, HttpStatus.OK);
    }


    @GetMapping
    @Operation(summary = "List all members")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Members found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MemberDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Members not found", content = @Content)
    })

    public ResponseEntity<List<MemberDTO>> findAllMembers(){
        var members = memberService.findAllMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete member by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Member successfully deleted", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Member not Found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> deleteMemberById(@PathVariable Long id){
        memberService.deleteMemberById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
