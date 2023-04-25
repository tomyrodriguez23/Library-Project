package project.library.service.Interface;

import project.library.DTO.LibraryDTO;

import java.util.List;

public interface LibraryInterface {

    void saveLibrary(LibraryDTO libraryDTO);
    void updateLibrary(LibraryDTO libraryDTO);
    LibraryDTO findLibraryById(Long id);
    List<LibraryDTO> findAllLibraries();
    void deleteLibraryById(Long id);
}
