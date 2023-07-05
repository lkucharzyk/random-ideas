import axios from 'axios'

class IdeasAPI{
    constructor(){
        this.apiUrl = 'http://localhost:5000/api/ideas'
    }

    getIdeas(){
        return axios.get(this.apiUrl);
    }

    createIdea(data){
        return axios.post(this.apiUrl, data);
    }

    updateIdea(id, data){
        return axios.put(`${this.apiUrl}/${id}`, data)
    }

    deleteIdea(id){
        const username = localStorage.getItem('username') ? localStorage.getItem('username') :'';
        return axios.delete(`${this.apiUrl}/${id}`,{
            data: {
                username
            }
        } )
    }
}

export default new IdeasAPI;