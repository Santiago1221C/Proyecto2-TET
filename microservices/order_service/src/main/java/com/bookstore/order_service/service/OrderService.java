package com.bookstore.order_service.service;

import com.bookstore.order_service.model.Order;
import com.bookstore.order_service.model.OrderItem;
import com.bookstore.order_service.model.OrderStatus;
import com.bookstore.order_service.repository.OrderRepository;
import com.bookstore.order_service.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository; // Para uso futuro (Si se necesita)

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository){
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    // Crear una nueva orden para un usuario

    @Transactional
    public Order createOrder(Long userId, List<OrderItem> items){

        if (items == null || items.isEmpty()){
            throw new IllegalArgumentException("La orden debe contener al menos un item.");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus(OrderStatus.CREATED);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        // Relacion bidireccional
        for (OrderItem item : items){
            item.setOrder(order);
        }
        order.setItems(items);

        // Calcular el total
        double total = items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();
        order.setTotalPrice(total);

        // Guardar la orden
        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Order> getOrderById(Long id){
        return orderRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByUser(Long userId){
        return orderRepository.findByUserId(userId);
    }

    // Actualiza el estado de una orden
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus newStatus){
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Orden no encontrada con ID: " + orderId));
        order.setStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    @Transactional
    public void deleteOrder(Long orderId){
        orderRepository.deleteById(orderId);
    }
}