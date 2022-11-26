import axios from "axios";

export default class RentService {
    static async getAll(){
        const response =  axios.get(`http://localhost:3000/api/v1/car_rents`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async getByUserId(id){
        const response =  axios.get(`http://localhost:3000/api/v1/car_rents?userId=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async create(rent){
        const response =  axios.post(`http://localhost:3000/api/v1/car_rents`,
            {
                rent
            },
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('token')
                    }
            });

        return response
    }

    static async endById(id){
        const response =  axios.get(`http://localhost:3000/api/v1/car_rents/end?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

}
