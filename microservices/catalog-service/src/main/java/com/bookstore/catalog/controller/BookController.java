package com.bookstore.catalog.controller;

import com.bookstore.catalog.model.Book;
import com.bookstore.catalog.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService service;

    public BookController(BookService service){
        this.service = service;
    }

    @GetMapping
    public List<Book> getAllBooks(){
        return service.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){
        return service.getBookById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book){
        return ResponseEntity.ok(service.createBook(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book){
        return ResponseEntity.ok(service.updateBook(id, book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id){
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/title/{title}")
    public List<Book> searchByTitle(@PathVariable String title){
        return service.searchByTitle(title);
    }

    @GetMapping("/search/author/{author}")
    public List<Book> searchByAuthor(@PathVariable String author){
        return service.searchByAuthor(author);
    }

    @GetMapping("/search/genre/{genre}")
    public List<Book> searchByGenre(@PathVariable String genre){
        return service.searchByGenre(genre);
    }
}