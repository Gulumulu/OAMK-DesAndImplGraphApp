import axios from 'axios';

function getItems(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(results => {
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    });
}

function getRegionLevels() {
    return new Promise((resolve, reject) => {
        axios.get("http://melatupa.azurewebsites.net/regionLevels", { headers : {'Accept-Language': 'en'}})
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

function getRegions(regionLevelId) {
    return new Promise((resolve, reject) => {
        axios.get("http://melatupa.azurewebsites.net/regionLevels/"+ String(regionLevelId) +"/regions", { headers : {'Accept-Language': 'en'}})
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

function getScenarios(scenarioCollectionId, regionId) {
    return new Promise((resolve, reject) => {
        axios.get("http://melatupa.azurewebsites.net/scenarioCollection/"+ String(scenarioCollectionId) +"/region/"+ String(regionId), { headers : {'Accept-Language': 'en'}})
            .then(results => {
                const scenarios = results.data.map(element => {
                    return element;
                });
                resolve(scenarios);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
    })
}

export default { getItems, getRegionLevels, getRegions, getScenarios };