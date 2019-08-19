import "./app.scss";

(function (tappProject, chayns, window, undefined) {
    'use strict';

    $search = document.querySelector(".search");


    tappProject.init = function init(data) {
        chayns.ready.then(() => {
            chayns.ui.initAll();

            $search.addEventListener('input', () => _search());
            $search.addEventListener('change', () => _search());
            $search.addEventListener('keypress', () => _search());
            $search.addEventListener('paste', () => _search());

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
            .then((data) => { _createList(data.Data) })
            .catch((err) => { console.log(err) });
    }

    function _createList(data) {
        let $list = document.querySelector(".sitelist");

        for (let element = 0; element < data.length; element++) {
            $list.appendChild(_listItem(data[element]));
        }
    }

    function _search() {
        for (const listItem of listItem) {
            if ((listItem.querySelector(listItem.title).innerHTML.toUpperCase())
                .indexOf($search.value.toUpperCase()) > -1)
                listItem.style.display = "";
            else
                listItem.style.display = "none";
        }
    }

})((window.tappProject = {}), chayns, window);
tappProject.init();