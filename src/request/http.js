import axios from "axios";
import qs from "qs";


//post HEADER
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
//Setting timeout
axios.defaults.timeout = 120000;
// axios.defaults.timeout = 1000;

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {

        if (response.status == 200 ) {
            return Promise.resolve(response);
            sessionStorage.setItem('timeout', 0);
        } else {
            return Promise.reject(response);
            sessionStorage.setItem('timeout', 1);
        }
    },
    (error) => {
        sessionStorage.setItem('timeout', 1);
        return Promise.reject(error);
    }
);
export default {
    //Post
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url,
                data: qs.stringify(data),
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    //GET
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                url,
                params: data,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};