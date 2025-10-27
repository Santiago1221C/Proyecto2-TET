package com.bookstore.cart_service.controller;

import com.bookstore.cart_service.model.Cart;
import com.bookstore.cart_service.model.CartItem;
import com.bookstore.cart_service.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{userId}")
    public Cart createCart(@PathVariable Long userId) {
        return cartService.createCart(userId);
    }

    @PostMapping("/{userId}/items")
    public Cart addItem(@PathVariable Long userId, @RequestBody CartItem item) {
        return cartService.addItemToCart(userId, item);
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @DeleteMapping("/{userId}/items/{itemId}")
    public Cart removeItem(@PathVariable Long userId, @PathVariable Long itemId){
        return cartService.removeItemFromCart(userId, itemId);
    }

    @DeleteMapping("/{userId}")
    public String deleteCart(@PathVariable Long userId){
        cartService.deleteCart(userId);
        return "Carrito eliminado correctamente por el usuario: " + userId;
    }
}