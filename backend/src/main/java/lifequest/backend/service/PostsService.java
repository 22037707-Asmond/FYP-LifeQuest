package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Articles;
import lifequest.backend.repository.PostsRepository;
import lombok.AllArgsConstructor;
import java.util.List;


@Service
@AllArgsConstructor
public class PostsService {
    @Autowired
    public PostsRepository postsRepository;

    public Articles addPost(Articles post) {
        return postsRepository.save(post);
    }

    public List<Articles> getAllPosts() {
        return postsRepository.findAll();
    }

    public void deletePost(Long id) {
        postsRepository.deleteById(id);
    }
}
