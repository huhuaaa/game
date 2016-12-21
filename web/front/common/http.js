import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    get: (url, data, config)=>{
        return axios.get(url, data, config).then((response)=>{
            if(response.status == 200){
                return response.data
            }
        }).catch(()=>{
            console.log('fail')
        })
    },
    post: (url, data, config)=>{
        return axios.post(url, data, config).then((response)=>{
            if(response.status == 200){
                return response.data
            }
        }).catch(()=>{
            console.log('fail')
        })
    }
}