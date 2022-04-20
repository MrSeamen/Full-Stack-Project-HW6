//imports
    import axios from 'axios';
    let url = 'api/posts/';

//class
    class bridge {
    //CRUD examples (for reference only)
        //create/update
            static setDocument(params){
                try {
                    let command = 'setDocument';
                    return axios.post(url + command, params);
                } catch(err){
                    reject(err);
                }
            }
        //read
            static getDocument(params){
                return new Promise(async (resolve, reject) => {
                    try {
                        let command = 'getDocument';
                        let res = await axios.post(url + command, params);
                        resolve(res.data);
                    } catch(err){
                        reject(err);
                    }
                });
            }
        //delete
            static deleteDocument(params){
                return new Promise(async (resolve, reject) => {
                    try {
                        let command = 'deleteDocument';
                        let res = await axios.post(url + command, params);
                        resolve(res.data);
                    } catch(err){
                        reject(err);
                    }
                });
            }

    //customs
        //delete
            static deleteUser(params){
                try {
                    let command = 'deleteUser';
                    return axios.post(url + command, params);
                } catch(err){
                    reject(err);
                }
            }

        //set
            static setUser(params){
                try {
                    let command = 'setUser';
                    return axios.post(url + command, params);
                } catch(err){
                    reject(err);
                }
            }

        //get token
            static getToken(user){
                return new Promise(async (resolve, reject) => {
                    try {
                        let command = 'getToken';
                        let res = await axios.post(url + command, user);
                        resolve(res.data);
                    } catch(err){
                        reject(err);
                    }
                });
            }
    }

    //export
        export default bridge;