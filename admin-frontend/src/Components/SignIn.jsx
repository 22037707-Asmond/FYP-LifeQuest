import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css';

const SignIn = () => {
    return (
        <>
            <br />
            <section className="login-form">
                <div className="container">
                    <div className="row">
                        <div style={{ textAlign: 'center', marginTop: '-50px' }}>
                            <section>
                                <main className="login-form">
                                    <h1>Admin - LifeQuest</h1>
                                    <form action="/admin/login" method="POST">
                                        <div className="form-field">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
                                            />
                                        </div>
                                        <div className="mt-5" style={{ textAlign: 'center' }}>
                                            <button type="submit" style={{ background: '#337ab7', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
                                        </div>
                                    </form>
                                </main>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignIn;
