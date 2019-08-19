import "./app.scss";

const numberArray = ['z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

(function (tappProject, chayns, window, undefined) {
    'use strict';

    let siteList = [];
    let $addSite = document.querySelector(".addSite");

    tappProject.init = function init(data) {
        chayns.ready.then(() => {
            chayns.ui.initAll();

            const $search = document.querySelector(".search");

            $addSite.addEventListener('click', () => { _addMessage() });
            $search.addEventListener('input', e => _search(e.target.value));
            $search.addEventListener('click', e => { e.stopPropagation() });

            _getFetchData();

        })
    };

    function _listItem({ siteId, locationId, appstoreName, facebookId }) {
        let listItem = document.createElement("div");
        listItem.className = "listItem";
        let icon = document.createElement("img");
        icon.alt = "icon";
        icon.src = `https://sub60.tobit.com/l/${siteId}`;
        const indivClass = numberToText(siteId.replace("-", ""));
        icon.className = `icon ${indivClass}`;
        icon.onerror = () => document.querySelector(`.${indivClass}`).src = "https://visualpharm.com/assets/403/Location-595b40b65ba036ed117d27da.svg";
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

    function getNumberString(number) {
        return numberArray[number];
    }

    function numberToText(number) {
        let returnString = "";
        const convertNumber = number.toString();
        for (let i = 0; i < convertNumber.length; i++) {
            returnString = returnString.concat(getNumberString(parseInt(convertNumber.charAt(i))));
        }

        return returnString;
    }

    function _getFetchData() {
        fetch("https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50")
            .then((response) => { return response.json() })
            .then((data) => {
                siteList = data.Data;
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

    function _addMessage() {
        // send application 
        chayns.intercom.sendMessageToPage({
            text: `${'Neue Seite'}
                    ${'ID: '} ${chayns.env.user.id}
                    ${'Name '} ${document.querySelector("input[name='name']").value}
                    ${'E-mail '} ${document.querySelector("input[name='email']").value}
                    ${'Adresse '} ${document.querySelector("input[name='adress']").value}
                    ${'Kommentar '} ${document.querySelector("textarea[name='comment']").value}`
        })
        chayns.dialog.alert("","Danke fürs hinzufügen deiner Webseite. Deine Anfrage wird bearbeitet!");
        document.querySelector("input[name='name']").value = "";
        document.querySelector("input[name='email']").value = "";
        document.querySelector("input[name='adress']").value = "";
        document.querySelector("textarea[name='comment']").value = "";

    }

})((window.tappProject = {}), chayns, window);
tappProject.init();