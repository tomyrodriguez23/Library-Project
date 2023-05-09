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
import project.library.service.Implements.AuthService;
import project.library.service.Implements.MemberService;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth",
        description = "Authentication Operations")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @Operation(summary = "Save new member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Member saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<String> signUp(@RequestBody @Valid MemberDTO memberDTO){
        String token = authService.signUpMember(memberDTO);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

    @GetMapping("/confirm")
    @Operation(summary = "Confirm Member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Member confirmed succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Token Not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<String> confirm(@RequestParam String token){
        var msj = authService.confirmToken(token);
        return new ResponseEntity<>(msj, HttpStatus.OK);
    }

    @PostMapping("/login")
    @Operation(summary = "Login member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Login succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<AuthResponse> logIn(@RequestBody @Valid AuthRequest request) throws BadRequestException {
        var data = authService.logIn(request);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/send")
    @Operation(summary = "Send Email with Token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email with Token confirmed succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Mail Not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<String> sendEmail(@RequestParam String email){
        var msj = authService.sendEmail(email);
        return new ResponseEntity<>(msj, HttpStatus.CREATED);
    }

}
