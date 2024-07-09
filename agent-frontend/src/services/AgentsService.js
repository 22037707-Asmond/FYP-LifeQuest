import axios from 'axios';

const AGENTS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/agents';

class AgentsService {

    getAllAgents(){
        return axios.get(AGENTS_BASE_REST_API_URL);
    }
}

export default new AgentsService();