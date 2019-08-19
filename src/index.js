import "./app.scss";

(function (tappProject, chayns, window, undefined) {
    'use strict';

    tappProject.init = function init(data) {
        chayns.ready.then(() => {
            chayns.ui.initAll();

            _getFetchData();
        })
    };

    function _listItem({ siteId, locationId, appstoreName, facebookId }) {
        let listItem = document.createElement("div");
        listItem.className = "listItem";
        let icon = document.createElement("img");
        icon.alt = "icon";
        icon.src = `https://sub60.tobit.com/l/${siteId}`;
        icon.className = "icon";
        listItem.appendChild(icon);
        let title = document.createElement("h3");
        title.innerHTML = appstoreName;
        listItem.appendChild(title);

        return listItem;
    }

    function _getFetchData() {
        fetch("https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50")
            .then((response) => { return response.json() })
            .then((data) => { _createList(data.Data) })
            .catch((err) => { console.log(err) });
    }

    function _createList(data) {
        let $list = document.querySelector(".sitelist");

        for (let element = 0; element < data.length; element++) {
            $list.appendChild(_listItem(data[element]));
        }
    }

})((window.tappProject = {}), chayns, window);
tappProject.init();