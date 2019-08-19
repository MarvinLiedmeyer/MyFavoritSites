import "./app.scss";

(function (tappProject, chayns, window, undefined) {
    'use strict';

    let siteList = [];

    tappProject.init = function init(data) {
        chayns.ready.then(() => {
            chayns.ui.initAll();

            const $search = document.querySelector(".search");

            $search.addEventListener('input', e => _search(e.target.value));

            _getFetchData();

        })
    };

    function _listItem({ siteId, locationId, appstoreName, facebookId }) {
        let listItem = document.createElement("div");
        listItem.className = "listItem";
        let icon = document.createElement("img");
        icon.alt = "icon";
        icon.src = `https://sub60.tobit.com/l/${siteId}` 
        icon.className = "icon";
        icon.onerror = () => document.querySelector(".icon").src = "https://i.ytimg.com/vi/XIMLoLxmTDw/hqdefault.jpg";
        listItem.appendChild(icon);
        let title = document.createElement("h3");
        title.className = "listItemTitle";
        title.addEventListener("click", () => {
            window.open(`https://chayns.net/${siteId}`);
        })
        let facebookIcon = document.createElement("img");
        facebookIcon.alt = "facebookIcon";
        facebookIcon.src = "https://image.flaticon.com/icons/svg/124/124010.svg";
        facebookIcon.className = "facebookIcon";
        facebookIcon.addEventListener("click", () => {
            window.open(`https://www.facebook.com/profile.php?id=${facebookId}`);
        })
        title.innerHTML = appstoreName;
        listItem.appendChild(title);
        listItem.appendChild(facebookIcon);


        return listItem;
    }

    function _getFetchData() {
        fetch("https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50")
            .then((response) => { return response.json() })
            .then((data) => {
                siteList = data.Data;
                console.log(siteList);
                _createList(siteList);
            })
            .catch((err) => { console.log(err) });
    }

    function _createList(data) {
        let $list = document.querySelector(".sitelist");

        for (let element = 0; element < data.length; element++) {
            $list.appendChild(_listItem(data[element]));
        }
    }

    function _search(searchText) {
        document.querySelector(".sitelist").innerHTML = null;
        let filterList = siteList.filter(e => e.appstoreName.includes(searchText));
        _createList(filterList);
    }

})((window.tappProject = {}), chayns, window);
tappProject.init();