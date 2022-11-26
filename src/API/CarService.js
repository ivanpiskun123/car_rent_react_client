import axios from "axios";

export default class CarService {
    static async getAll(){
        const response =  axios.get(`http://localhost:3000/api/v1/cars`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async getRentingAll(){
        const response =  axios.get(`http://localhost:3000/api/v1/cars?renting=true`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async getById(id){
        const response =  axios.get(`http://localhost:3000/api/v1/cars/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }


}
