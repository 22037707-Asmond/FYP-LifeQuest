import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllAgents = () => {
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch('/api/lifequest/agent'); 
                const data = await response.json();
                setAgents(data.agents);
            } catch (error) {
                console.error('Failed to fetch agents', error);
                setError('Failed to load agents');
            }
        };

        fetchAgents();
    }, []);

    return (
        <div className="App">
            <div className="container">
                <h1>All Registered Agents</h1>
                {error && <p className="text-danger">{error}</p>}
                <div className="list-group">
                    {agents.map(agent => (
                        <div key={agent.id} className="list-group-item" onClick={() => navigate(`/agent/${agent.id}`)}>
                            <img src={agent.profile_picture} alt={agent.first_name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                            <div>{agent.first_name} {agent.last_name} - {agent.years_of_experience} years experience</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllAgents;
