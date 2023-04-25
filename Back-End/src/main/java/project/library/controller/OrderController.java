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
import project.library.DTO.BookDTO;
import project.library.DTO.OrderDTO;
import project.library.exception.BadRequestException;
import project.library.service.Implements.OrderService;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "Order",
        description = "Order's Operations")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Save new order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Order saved succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<HttpStatus> saveOrder(@RequestBody @Valid OrderDTO orderDTO) throws BadRequestException {
        orderService.saveOrder(orderDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Order and Book")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Order and Book updated succesfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Order and book not found", content = @Content)
    })
    public ResponseEntity<HttpStatus> updateBook(@PathVariable Long id){
        orderService.returnBookAndUpdateOrder(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Search order by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order found succesfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = OrderDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Order not found", content = @Content)
    })

    public ResponseEntity<OrderDTO> findOrderById(@PathVariable Long id){
        var order = orderService.findOrderById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }


    @GetMapping
    @Operation(summary = "List all orders")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Orders found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = OrderDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Orders not found", content = @Content)
    })

    public ResponseEntity<List<OrderDTO>> findAllOrders(){
        var orders = orderService.findAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete order by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order successfully deleted", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Order not Found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })

    public ResponseEntity<HttpStatus> deleteOrderById(@PathVariable Long id){
        orderService.deleteOrderById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/member/{id}")
    @Operation(summary = "List all orders by Member ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Orders found succefully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = OrderDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Orders not found", content = @Content)
    })

    public ResponseEntity<List<OrderDTO>> findAllOrdersByMemberId(@PathVariable Long id){
        var orders = orderService.findAllByMemberId(id);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }



}
