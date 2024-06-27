import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AgentsService from '../services/AgentsService';

const ListAgentsComponents = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        getAllAgents();
    }, []);

    const getAllAgents = () => {
        AgentsService.getAllAgents().then((response) => {
            setAgents(response.data);
            console.log(response.data);                 
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteAgent = (agentId) => {
        AgentsService.deleteAgent(agentId).then((response) => {
            getAllAgents();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">List Agents</h2>
            <Link to="/add-agent" className="btn btn-primary mb-2">Add Agent</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Agent First Name</th>
                        <th>Agent Last Name</th>
                        <th>Agent Profile Picture</th>
                        <th>Agent Years of Experience</th>
                        <th>Agent Bio</th>
                        <th>Agent Phone Number</th>
                        <th>Agent Salary</th>
                        <th>Actions</th>                            
                    </tr>
                </thead>
                <tbody>
                    {
                        agents.map(
                            agent =>
                            <tr key={agent.id}>
                                <td>{agent.firstName}</td>
                                <td>{agent.lastName}</td>
                                <td>
                                    <img 
                                        src={`/api/v1/agents/${agent.id}/profilePicture`} 
                                        alt="Profile" 
                                        width="50" 
                                        height="50" 
                                    />
                                </td>
                                <td>{agent.yearsOfExperience}</td>
                                <td>{agent.bio}</td>
                                <td>{agent.phoneNumber}</td>
                                <td>{agent.salary}</td> 
                                <td>
                                    <Link to={`/edit-agent/${agent.id}`} className="btn btn-info">Update</Link>
                                    <button className="btn btn-danger" onClick={() => deleteAgent(agent.id)}
                                    style = {{marginLeft:"10px"}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListAgentsComponents;
