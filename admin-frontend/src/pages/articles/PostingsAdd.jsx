import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/PageFragment/Header';
import { addPost } from './PostingAPI';
import './Postings.css';

const PostingsAdd = () => {
    const [uploads, setUploads] = useState(null);
    const [messages, setMessages] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setUploads(selectedFile);
        setFile(URL.createObjectURL(selectedFile));
        setFileType(selectedFile.type);
    };

    const handleClear = () => {
        setUploads(null);
        setMessages('');
        setTitle('');
        setFile(null);
        setFileType('');
        document.getElementById('uploads').value = '';
        document.getElementById('item_description').value = '';
        document.getElementById('item_title').value = '';
    };

    function savePost(e) {
        e.preventDefault();
        setError('');

        if (messages === '' || title === '') {
            setError("Message and title cannot be empty");
            return;
        } else {
            const formData = new FormData();
            formData.append('media', uploads);
            formData.append('title', title);
            formData.append('content', messages);

            addPost(formData)
                .then((response) => {
                    console.log(response.data);
                    if (response.data === "Article created successfully") {
                        navigate('/article');
                    } else {
                        setError(response.data);
                    }
                })
                .catch((error) => {
                    console.error("There was an error creating the post!", error);
                    setError("There was an error creating the post!");
                });
        }
    }

    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(file);
            }
        };
    }, [file]);

    return (
        <>
            <section>
                <div className="App">
                    <main>
                        <Header title="Add Article" subtitle="LifeQuest's posts"/>
                        <form onSubmit={savePost}>
                            <div className="mb-3 col-10">
                                <label htmlFor="uploads" className="form-label">Image/Video</label>
                                <input
                                    id="uploads"
                                    className="form-control"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, video/mp4"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {file && (
                                <div className="mb-3 col-5">
                                    {fileType.startsWith('video/') ? (
                                        <video width="100%" controls>
                                            <source src={file} type={fileType} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img src={file} alt="Preview" className="img-fluid" />
                                    )}
                                </div>
                            )}

                            <div className="mb-3 col-10">
                                <label htmlFor="item_description" className="form-label">Message</label>
                                <textarea
                                    id="item_description"
                                    className="form-control"
                                    rows="5"
                                    value={messages}
                                    onChange={(e) => setMessages(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 col-5">
                                <label htmlFor="item_title" className="form-label">Title</label>
                                <input
                                    id="item_title"
                                    className="form-control"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-danger">{error}</p>}

                            <div className="mt-5">
                                <input type="submit" value="Post" className="btn btn-primary" />
                                <button type="button" className="btn btn-secondary ms-2" onClick={handleClear}>Clear</button>
                            </div>
                        </form>
                        <br />
                    </main>
                </div>
            </section>
        </>
    );
};

export default PostingsAdd;
