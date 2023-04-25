package project.library.controller;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
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
import project.library.DTO.LibraryDTO;
import project.library.service.Implements.LibraryService;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/libraries")
@Tag(name = "Library",
        description = "Library's Operations")
public class LibraryController {

    private final LibraryService libraryService;


    @PostMapping
    @Operation(summary = "Save new library")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Library saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> saveLibrary(@RequestBody @Valid LibraryDTO libraryDTO){
        libraryService.saveLibrary(libraryDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping
    @Operation(summary = "Update library")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Library updated succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Library not found", content = @Content)
    })

    public ResponseEntity<HttpStatus> updateLibrary(@RequestBody @Valid LibraryDTO libraryDTO){
        libraryService.updateLibrary(libraryDTO);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Search library by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Library found succesfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LibraryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Library not found", content = @Content)
    })

    public ResponseEntity<LibraryDTO> findLibraryById(@PathVariable Long id){
        var library = libraryService.findLibraryById(id);
        return new ResponseEntity<>(library, HttpStatus.OK);
    }


    @GetMapping
    @Operation(summary = "List all libraries")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Libraries found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LibraryDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Library not found", content = @Content)
    })

    public ResponseEntity<List<LibraryDTO>> findAllLibraries(){
        var libraries = libraryService.findAllLibraries();
        return new ResponseEntity<>(libraries, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete library by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Library successfully deleted", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Library not Found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> deleteLibraryById(@PathVariable Long id){
        libraryService.deleteLibraryById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
