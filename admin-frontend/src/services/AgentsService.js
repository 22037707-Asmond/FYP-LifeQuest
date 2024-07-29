import axios from 'axios';

const AGENTS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/agents';

class AgentsService {

    getAllAgents(){
        return axios.get(AGENTS_BASE_REST_API_URL);
    }

    createAgent(agent){
        return axios.post(AGENTS_BASE_REST_API_URL, agent)
    }

    getAgentById(agentId){
        return axios.get(AGENTS_BASE_REST_API_URL + '/' + agentId);
    }

    updateAgent(agent, agentId){
        return axios.put(AGENTS_BASE_REST_API_URL + '/' + agentId, agent);
    }

    deleteAgent(agentId){
        return axios.delete(AGENTS_BASE_REST_API_URL + '/' + agentId);
    }

    
}

const agentsService = new AgentsService();
export default agentsService;
