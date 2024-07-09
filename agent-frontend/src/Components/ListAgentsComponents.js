import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AgentsService from '../services/AgentsService';

const ListAgentsComponents = () => {

    const [agents, setAgents] = useState([]);

    useEffect(() => {
        AgentsService.getAllAgents().then((response) => {
            setAgents(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className="container">
            <h2 className = "text-center"> List Agents</h2>
            <Link to="/add-agent" className="btn btn-primary mb-2">Add Agent</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Agent First Name</th>
                        <th>Agent Last Name</th>
                        <th>Agent Profile Picture</th>
                        <th>Agent Years of Experience</th>
                        <th>Agent Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        agents.map(
                            agent =>
                            <tr key = {agent.id}>
                                <td> {agent.firstName} </td>
                                <td> {agent.lastName} </td>
                                <td> {agent.profilePicture} </td>
                                <td> {agent.yearsOfExperience} </td>
                                <td> {agent.bio} </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListAgentsComponents
