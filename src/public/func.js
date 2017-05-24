import axios from "axios";

export default {
    ajaxGet (api, cb) {
        console.log(api)
        axios.get(api)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
    ajaxPost (api, post, cb) {
        axios.post(api, post)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
}