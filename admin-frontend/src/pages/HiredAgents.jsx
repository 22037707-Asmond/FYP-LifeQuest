// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const HiredAgents = () => {
//     const [hiredAgents, setHiredAgents] = useState([]);
//     const [error, setError] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchHiredAgents = async () => {
//             try {
//                 const response = await fetch('/api/lifequest/hired-agents'); // Adjust the endpoint as necessary
//                 const data = await response.json();
//                 setHiredAgents(data.agents);
//             } catch (error) {
//                 console.error('Failed to fetch hired agents', error);
//                 setError('Failed to load hired agents');
//             }
//         };

    //     fetchHiredAgents();
    // }, []);

//     return (
//         <div className="App">
//             <div className="container">
//                 <h1>Hired Agents</h1>
//                 {error && <p className="text-danger">{error}</p>}
//                 <div className="list-group">
//                     {hiredAgents.map(agent => (
//                         <div key={agent.id} className="list-group-item" onClick={() => navigate(`/agent-details/${agent.id}`)}>
//                             <img src={agent.profile_picture} alt={agent.first_name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
//                             <div>{agent.first_name} {agent.last_name} - Hired for project</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HiredAgents;
