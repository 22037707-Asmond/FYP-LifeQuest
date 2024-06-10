import React, { useEffect, useState } from 'react';

function PostsListing() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        fetch(`http://localhost:8080/api/posts?page=${currentPage}&limit=${postsPerPage}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="posts-listing">
            {posts.map((post, index) => (
                <div key={index} className="post">
                    <h2>{post.title}</h2>
                    {post.media && (
                        <div className="media">
                            {post.media.type === 'image' ? (
                                <img src={post.media.url} alt={post.title} />
                            ) : (
                                <video controls>
                                    <source src={post.media.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                    <p>{post.message}</p>
                </div>
            ))}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

export default PostsListing;
