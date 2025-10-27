package com.bookstore.order_service.controller;

import com.bookstore.order_service.dto.OrderRequest;
import com.bookstore.order_service.model.Order;
import com.bookstore.order_service.model.OrderItem;
import com.bookstore.order_service.model.OrderStatus;
import com.bookstore.order_service.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    // Creación de una nueva orden
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest){
        // Mapeo al DTO
        List<OrderItem> items = orderRequest.getItems().stream()
                .map(it -> {
                    OrderItem oi = new OrderItem();
                    oi.setBookId(it.getBookId());
                    oi.setTitle(it.getTitle());
                    oi.setPrice(it.getPrice());
                    oi.setQuantity(it.getQuantity());
                    return oi;
                })
                .collect(Collectors.toList());
        
        Order created = orderService.createOrder(orderRequest.getUserId(), items);
        return ResponseEntity.ok(created);
    }

    // Obtener todas las órdenes
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // Obtener order por id
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id){
        return orderService.getOrderById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Actualizar estado de una orden
    @PostMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status){
        try {
            OrderStatus newStatus = OrderStatus.valueOf(status.toUpperCase());
            Order updated = orderService.updateOrderStatus(id, newStatus);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build(); // Status inválido
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una orden
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
