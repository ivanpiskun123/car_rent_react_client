import axios from "axios";

export default class UserService {
    static async getAll(){
        const response =  axios.get(`http://localhost:3000/api/v1/users`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async getById(id){
        const response =  axios.get(`http://localhost:3000/api/v1/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async getShortById(id){
        const response =  axios.get(`http://localhost:3000/api/v1/users/short_show?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async rejectDocByUserId(id){
        const response =  axios.get(`http://localhost:3000/api/v1/users/reject_doc?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async approveDocByUserId(id){
        const response =  axios.get(`http://localhost:3000/api/v1/users/approve_doc?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }


}
