import axios from 'axios';

function getItems() {
    return new Promise((resolve, reject) => {
        //"http://melatupa.azurewebsites.net/regionLevels"
        axios.get("http://melatupa.azurewebsites.net/regionLevels/1/regions")
            .then(results => {
                console.log(results);
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    });
}

export default { getItems };