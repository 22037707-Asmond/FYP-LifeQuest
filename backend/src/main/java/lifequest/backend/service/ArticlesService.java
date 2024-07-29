package lifequest.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Articles;
import lifequest.backend.repository.ArticlesRepository;

@Service
public class ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;

    public String addPost(MultipartFile file, String title, String content) {
        try {
            Articles article = new Articles();
            article.setTitle(title);
            article.setContent(content);

            String fileType = file.getContentType();
            if (fileType != null) {
                if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
                    article.setMedia(file.getBytes());
                } else {
                    return "Unsupported file type";
                }
            }

            articlesRepository.save(article);
            return "Article created successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to create article";
        }
    }

    public List<Articles> getAllPosts() {
        return articlesRepository.findAll();
    }
    
    public boolean deletePost(Long id) {
        if (articlesRepository.existsById(id)) {
            articlesRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
    

    public Articles updateArticles(Long id, Articles articlesDetails) {
        Articles articles = articlesRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));

        articles.setTitle(articlesDetails.getTitle());
        articles.setContent(articlesDetails.getContent());
        articles.setMedia(articlesDetails.getMedia());

        return articlesRepository.save(articles);
    }
}