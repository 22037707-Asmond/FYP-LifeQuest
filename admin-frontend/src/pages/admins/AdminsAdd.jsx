import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/PageFragment/Header';
import { addAdmin } from './AdminsAPI';
import './Admins.css';

const AdminsAdd = () => {
    const [mr_ms, setMr_ms] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleClear = () => {
        setMr_ms('');
        setTelephone('');
        setEmail('');
        setSalary('');
        setError('');
    };

    const saveAdmin = (e) => {
        e.preventDefault();
        setError('');
    
        if (mr_ms === '' || telephone === '' || email === '' || salary === '') {
            setError('All fields must be filled out');
            return;
        } else {
            const formData = new FormData();
            formData.append('mr_ms', mr_ms);
            formData.append('telephone', telephone);
            formData.append('email', email);
            formData.append('salary', salary);
    
            addAdmin(formData)
                .then((response) => {
                    console.log('API response:', response.data);
                    if (response.status === 201) {
                        navigate('/admin');
                    } else {
                        setError(response.data.message || 'Unexpected error occurred');
                    }
                })
                .catch((error) => {
                    console.error('API call error:', error.response ? error.response.data : error.message);
                    setError('There was an error creating the admin! Please check the console for details.');
                });
        }
    };
    

    return (
        <>
            <section>
                <div className="App">
                    <main>
                        <Header title="Add Admin" subtitle="LifeQuest's admins" />
                        <form onSubmit={saveAdmin}>
                            <div className="mb-3 col-10">
                                <label htmlFor="mr_ms" className="form-label">Mr/Ms</label>
                                <input
                                    id="mr_ms"
                                    className="form-control"
                                    type="text"
                                    value={mr_ms}
                                    onChange={(e) => setMr_ms(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-10">
                                <label htmlFor="telephone" className="form-label">Telephone</label>
                                <input
                                    id="telephone"
                                    className="form-control"
                                    type="text"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-10">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-10">
                                <label htmlFor="salary" className="form-label">Salary</label>
                                <input
                                    id="salary"
                                    className="form-control"
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-danger">{error}</p>}

                            <div className="mt-5">
                                <input type="submit" value="Add Admin" className="btn btn-primary" />
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

export default AdminsAdd;
