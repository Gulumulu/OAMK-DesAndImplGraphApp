import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

// var urls: [
//     "http://melatupa.azurewebsites.net/regionLevels",
//     "http://melatupa.azurewebsites.net/regionLevels/1/regions",
//     "http://melatupa.azurewebsites.net/scenarioCollection/6/region/24"
// ]

function getRegionLevels(){
    return new Promise((resolve, reject) => {
        axios.get("https://melatupa.azurewebsites.net/regionLevels",{ headers: { 'Accept-Language': reactLocalStorage.get('lang', 'fi') } })
            .then(results => {
                const regionLevels = results.data.map(element => {
                    return element;
                });
                resolve(regionLevels);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    });
}

function getRegions(regionLevelId){
    return new Promise((resolve, reject) => {
        axios.get("https://melatupa.azurewebsites.net/regionLevels/"+ String(regionLevelId) +"/regions",{ headers: { 'Accept-Language': reactLocalStorage.get('lang', 'fi') } })
            .then(results => {
                const regions = results.data.map(element => {
                    return element;
                });
                resolve(regions);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    });
}

function getScenarios(scenarioCollectionId, regionId){
    return new Promise((resolve, reject) => {
        axios.get("https://melatupa.azurewebsites.net/scenarioCollection/"+ String(scenarioCollectionId) +"/region/"+ String(regionId),{ headers: { 'Accept-Language': reactLocalStorage.get('lang', 'fi') } })
            .then(results => {
                const scenarios = results.data.map(element => {
                    return element;;
                });
                resolve(scenarios);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    })

}

export default { getRegionLevels, getRegions, getScenarios };
