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
    let cities = [];
    let Data;
    let Base;
    let requirements = [];
    let researchpoints;

    function getProdutionInformation() {
        let growth = 0;
        for (let index = 0; index < cities.length; index++) {
            growth = growth + Base.Resource.GetResourceGrowPerHour(cities[index].get_CityCreditsProduction(), false);
        }
        let needed = (requirements[0] - Data.get_Player().GetCreditsCount()) / growth;
        console.log(needed);
    }

    function waitForSetup() {
        if (window.qx === undefined) {
            window.setTimeout(waitForSetup, 1000);
        } else {
            Data = window.ClientLib.Data.MainData.GetInstance();
            Base = window.ClientLib.Base;
            let faction = Data.get_Player().get_Faction();
            let index = 0;
            let object = Data.get_Cities().get_AllCities().d;
            let value = Base.ETechName.Research_BaseFound;
            let techID = Base.Tech.GetTechIdFromTechNameAndFaction(value, faction);
            let research = Data.get_Player().get_PlayerResearch().GetResearchItemFomMdbId(techID);
            if (research.get_NextLevelInfo_Obj() !== null) {
                requirements[0] = research.get_NextLevelInfo_Obj().rr[0].c;
                requirements[1] = research.get_NextLevelInfo_Obj().rr[1].c
                researchpoints = Data.get_Player().get_ResearchPoints();
                for (const key in object) {
                    if (Object.hasOwnProperty.call(object, key)) {
                        cities[index] = object[key];
                        index++;
                    }
                }
                getProdutionInformation();
                setInterval(getProdutionInformation, 60 * 1000);
            }
        }
    }
    waitForSetup();
    //currentowncity = cities.get_CurrentOwnCity();
    //researchpoints = currentowncity.GetResourceCount(this.ClientLib.Base.EResourceType.ResearchPoints);
    //this.ClientLib.Base.Resource.GetResourceGrowPerHour(currentowncity.get_CityCreditsProduction(), false);

    // qx.core.Init.getApplication().getUIItem();
    //ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity()

})();