package com.bookstore.cart_service.service;

import com.bookstore.cart_service.model.Cart;
import com.bookstore.cart_service.model.CartItem;
import com.bookstore.cart_service.repository.CartItemRepository;
import com.bookstore.cart_service.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Cart createCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart(userId);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public Cart addItemToCart(Long userId, CartItem itemRequest) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No existe carrito para el usuario: " + userId));

        itemRequest.setCart(cart);
        cart.getItems().add(itemRequest);

        cartItemRepository.save(itemRequest);
        cart.recalculateTotal();
        return cartRepository.save(cart);
    }

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario: " + userId));
    }

    @Transactional
    public Cart removeItemFromCart(Long userId, Long itemId){
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario: " + userId));
        CartItem item = cartItemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item no encontrado con ID: " + itemId));

        // Verificar que el item pertenece a este carrito
        if (!item.getCart().getId().equals(cart.getId())){
            throw new RuntimeException("El item no pertenece a este carrito");
        }

        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        cart.recalculateTotal();

        return cartRepository.save(cart);
    }

    // Eliminar carrito completamente
    @Transactional
    public void deleteCart(Long userId){
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario: " + userId));
        cartRepository.delete(cart);
    }
}