package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Articles;
import lifequest.backend.service.ArticlesService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ArticleController {
    @Autowired
    public ArticlesService postsService;

    @PostMapping("/article/add")
    public ResponseEntity<String> addPost(
            @RequestParam("media") MultipartFile media,
            @RequestParam("title") String title,
            @RequestParam("content") String content) {
        String result = postsService.addPost(media, title, content);
        if ("Article created successfully".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/article")
    public ResponseEntity<List<Articles>> getAllPosts() {
        List<Articles> articles = postsService.getAllPosts(); // Retrieve all articles from the service
        return new ResponseEntity<>(articles, HttpStatus.OK); // Return the articles as JSON with HTTP status 200
    }

    @DeleteMapping("/articles/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            boolean isDeleted = postsService.deletePost(id);
            if (isDeleted) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Article not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
