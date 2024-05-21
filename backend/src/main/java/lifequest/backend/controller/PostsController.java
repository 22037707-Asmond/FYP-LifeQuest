package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Posts;
import lifequest.backend.service.PostsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class PostsController {
    @Autowired
    public PostsService postsService;

    @PostMapping("/posts/add")
    public ResponseEntity<Posts> addPost(@RequestBody Posts post) {
        return new ResponseEntity<>(postsService.addPost(post), HttpStatus.CREATED);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Posts>> getAllPosts() {
        return new ResponseEntity<>(postsService.getAllPosts(), HttpStatus.OK);
    }

}
