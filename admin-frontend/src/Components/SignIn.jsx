import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <>
            <section className="login-form">
                <div className="container">
                    <div className="row">
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <section>
                                <main className="login-form">
                                    <h1>Admin - LifeQuest</h1>
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="username" className="col-sm-2 col-form-label">User ID:</label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                                            <div class="col-sm-10">
                                                <input
                                                    type="password"
                                                    id="password" 
                                                    name="password"
                                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
                                                />
                                            </div>
                                        </div>
                                        <Link to = '/dashboard-LQ'><button type="submit" style={{ background: '#337ab7', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Sign in</button></Link>
                                    </form>
                                </main>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="container h-100">
                    <div className="d-flex flex-column flex-md-row align-items-center h-100 p-2 p-md-0">
                        <small className="lineheight-1">&copy; 2024, LifeQuest Technologies</small>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default SignIn;
