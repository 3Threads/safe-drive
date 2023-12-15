const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
    params: {
        stops: '41.6938,44.8015;41.6461,41.6405;'
    },
    headers: {
        'X-RapidAPI-Key': 'e3fc70ca95msh0c1271a45bc037fp13f1eajsn7c9aa6fa0095',
        'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
    }
};

try {
    axios.request(options)
        .then((response: any) =>{
            console.log(response.data.route.legs[0].steps);
        })

} catch (error) {
    console.error(error);
}