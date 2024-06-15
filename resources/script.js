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

    var cities; //.get_CurrentOwnCity();
    var currentowncity;
    var researchpoints;

    // qx.core.Init.getApplication().getUIItem();
    //ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity()

    function setupVariables() {
        cities = this.ClientLib.Data.MainData.GetInstance().get_Cities();
        currentowncity = cities.get_CurrentOwnCity();
        researchpoints = currentowncity.GetResourceCount(this.ClientLib.Base.EResourceType.ResearchPoints);
        this.ClientLib.Base.Resource.GetResourceGrowPerHour(currentowncity.get_CityCreditsProduction(), false);
    }
})();