import { useEffect } from 'react';
import axios from "axios";
import url from "../../../Development.json";
import { errorResponse ,configHeaderAxios } from "../../helpers/response";
import { useHistory } from "react-router-dom";


const Logout = () => {
    let history = useHistory();

    useEffect(() => {
        const config = configHeaderAxios();

        const obj = {
            access_token: localStorage.getItem('access_token')
        };
        axios
            .post(process.env.REACT_APP_BASE_URL + url.logout, obj, config)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('admin_profile');
                    history.push("/login");
                }
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    });
    return (0)
}


export default Logout;
