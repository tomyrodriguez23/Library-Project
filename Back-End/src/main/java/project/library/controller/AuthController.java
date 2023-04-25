package project.library.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
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

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth",
        description = "Authentication Operations")
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/signup")
    @Operation(summary = "Save new member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Member saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<HttpStatus> signUp(@RequestBody @Valid MemberDTO memberDTO){
        memberService.saveMember(memberDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Login member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Login succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request) throws BadRequestException {
        var data = memberService.authenticate(request);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }





}
