import axios from 'axios';

// var urls: [
//     "http://melatupa.azurewebsites.net/regionLevels",
//     "http://melatupa.azurewebsites.net/regionLevels/1/regions",
//     "http://melatupa.azurewebsites.net/scenarioCollection/6/region/24"

// ]

function getItems(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
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

function getRegionLevels(){
    return new Promise((resolve, reject) => {
        axios.get("http://melatupa.azurewebsites.net/regionLevels")
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
        axios.get("http://melatupa.azurewebsites.net/regionLevels/"+ String(regionLevelId) +"/regions")
            .then(results => {
                //console.log(results);
                const regions = results.data.map(element => {
                    return element;
                });
                console.log(regions);
                resolve(regions);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    });
}

function getScenarioCollection(scenarioCollectionId, regionId){
    return new Promise((resolve, reject) => {
        axios.get("http://melatupa.azurewebsites.net/scenarioCollection/"+ String(scenarioCollectionId) +"/region/"+ String(regionId))
            .then(results => {
                const scenarioCollection = results.data.map(element => {
                    return element;;
                });
                console.log(scenarioCollection);
                resolve(scenarioCollection);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    })

}

function getScenario(){

}

export default { getItems, getRegionLevels, getRegions, getScenarioCollection, getScenario };