import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

// var urls: [
//     "http://melatupa.azurewebsites.net/regionLevels",
//     "http://melatupa.azurewebsites.net/regionLevels/1/regions",
//     "http://melatupa.azurewebsites.net/scenarioCollection/6/region/24"
// ]

function getRegionLevels(){
    return new Promise((resolve, reject) => {
        axios.get("http://melatupa.azurewebsites.net/regionLevels",{ headers: { 'Accept-Language': reactLocalStorage.get('lang', 'fi') } })
            .then(results => {
                //console.log(results);
                const regionLevels = results.data.map(element => {
                    return element;
                });
                console.log(regionLevels);
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
        axios.get("http://melatupa.azurewebsites.net/regionLevels/"+ String(regionLevelId) +"/regions",{ headers: { 'Accept-Language': reactLocalStorage.get('lang', 'fi') } })
            .then(results => {
                //console.log(results);
                const regions = results.data.map(element => {
                    return element;
                });
                // console.log(regions);
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
        axios.get("http://melatupa.azurewebsites.net/scenarioCollection/"+ String(scenarioCollectionId) +"/region/"+ String(regionId),{ headers: { 'Accept-Language': reactLocalStorage.get('lang', 'fi') } })
            .then(results => {
                const scenarios = results.data.map(element => {
                    return element;;
                });
                // console.log(scenarioCollection);
                resolve(scenarioCollection);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    })

}

export default { getRegionLevels, getRegions, getScenarios };
