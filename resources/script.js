// ==UserScript==
// @name         Cnc Helper
// @namespace    binclab
// @version      2024.06.08
// @description  Command & Conquer - Tiberium Alliances Helper
// @author       Bret Joseph Antonio
// @match        https://*.alliances.commandandconquer.com/*/index.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=binclab.com
// @grant        none
// ==/UserScript==

// Entry Point
(function () {
    'use strict';
    let cities;
    let Data;
    let Resource;

    function getProdutionInformation() {
        let credit = 0;
        for (let index = 0; index < cities.length; index++) {
            credit = credit + Resource.GetResourceGrowPerHour(cities[index].get_CityCreditsProduction(), false);
        }
        console.log(credit);
    }

    function waitForSetup() {
        if (window.qx == undefined || window.qx.core.Init.getApplication().initDone === false) {
            window.setTimeout(waitForSetup, 1000);
        } else {
            Data = window.ClientLib.Data.MainData.GetInstance().get_Cities();
            Resource = window.ClientLib.Base.Resource;
            cities = [Object.keys(Data.get_AllCities().d).length];
            for (let index = 0; index < cities.length; index++) {
                console.log(index);
                cities[index] = Object.values(Data.get_AllCities().d)[index];
            }
            getProdutionInformation();
            setInterval(getProdutionInformation, 60 * 1000);
        }
    }
    waitForSetup();
    //currentowncity = cities.get_CurrentOwnCity();
    //researchpoints = currentowncity.GetResourceCount(this.ClientLib.Base.EResourceType.ResearchPoints);
    //this.ClientLib.Base.Resource.GetResourceGrowPerHour(currentowncity.get_CityCreditsProduction(), false);

    // qx.core.Init.getApplication().getUIItem();
    //ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity()

})();