package project.library.service.Implements;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.library.DTO.LibraryDTO;
import project.library.exception.ResourceNotFoundException;
import project.library.model.Address;
import project.library.model.Library;
import project.library.repository.AddressRepository;
import project.library.repository.LibraryRepository;
import project.library.service.Interface.LibraryInterface;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibraryService implements LibraryInterface {

    private final LibraryRepository libraryRepository;
    private final AddressRepository addressRepository;

    private final ObjectMapper mapper;

    @Override
    public void saveLibrary(LibraryDTO libraryDTO) {

        var address = Address
                .builder()
                .country(libraryDTO.getAddress().getCountry())
                .city(libraryDTO.getAddress().getCity())
                .postCode(libraryDTO.getAddress().getPostCode())
                .line(libraryDTO.getAddress().getLine())
                .build();

        var addressSaved = addressRepository.save(address);

        var library = Library
                .builder()
                .name(libraryDTO.getName())
                .phoneNumber(libraryDTO.getPhoneNumber())
                .imageUrl(libraryDTO.getImageUrl())
                .address(addressSaved)
                .books(new HashSet<>())
                .members(new HashSet<>())
                .build();

        libraryRepository.save(library);
    }

    @Override
    public void updateLibrary(LibraryDTO libraryDTO) {
        var library = libraryRepository.findById(libraryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Library with ID: " + libraryDTO.getId() + " does not exist"));

        var address = Address
                .builder()
                .id(library.getAddress().getId())
                .country(libraryDTO.getAddress().getCountry())
                .city(libraryDTO.getAddress().getCity())
                .postCode(libraryDTO.getAddress().getPostCode())
                .line(libraryDTO.getAddress().getLine())
                .build();

        var addressSaved = addressRepository.save(address);

        var libraryToUpdate = Library
                .builder()
                .id(libraryDTO.getId())
                .name(libraryDTO.getName())
                .phoneNumber(libraryDTO.getPhoneNumber())
                .imageUrl(libraryDTO.getImageUrl())
                .address(addressSaved)
                .books(library.getBooks())
                .members(library.getMembers())
                .build();

        libraryRepository.save(libraryToUpdate);
    }

    @Override
    public LibraryDTO findLibraryById(Long id) {
        return libraryRepository.findById(id)
                .map(library -> mapper.convertValue(library, LibraryDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Library with ID: " + id + " does not exist"));
    }

    @Override
    public List<LibraryDTO> findAllLibraries() {
        var libraries = libraryRepository.findAll();
        if (libraries.isEmpty()){
            throw new ResourceNotFoundException("The list is empty");
        }
        return libraries.stream().map(library -> mapper.convertValue(library,LibraryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteLibraryById(Long id) {
        libraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Library with ID: " + id + " does not exist"));
        libraryRepository.deleteById(id);
    }

}
