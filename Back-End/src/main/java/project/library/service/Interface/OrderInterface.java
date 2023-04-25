package project.library.service.Interface;

import project.library.DTO.OrderDTO;
import project.library.exception.BadRequestException;
import project.library.model.Order;

import java.util.List;

public interface OrderInterface {
    void saveOrder(OrderDTO orderDTO) throws BadRequestException;
    OrderDTO findOrderById(Long id);
    List<OrderDTO> findAllOrders();
    void deleteOrderById(Long id);
    List<OrderDTO> findAllByMemberId(Long id);

    void returnBookAndUpdateOrder(Long id);

}
