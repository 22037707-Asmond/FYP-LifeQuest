import React from 'react';

const SignIn = () => {
    return (
        <>

            <div className="container"> 
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">
                                <i className="fas fa-sign-in-alt"></i>  Sign In
                            </h1>
                            <form action="/users/login" method="POST">
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
