import "./app.scss";
const elements = [{
    "siteId": "64944-20536",
    "locationId": 31662,
    "appstoreName": "- I love MFB -",
    "facebookId": "205363066272271"
},
{
    "siteId": "72418-10719",
    "locationId": 101979,
    "appstoreName": "#DigiLovers",
    "facebookId": "820230684773696"
},
{
    "siteId": "73137-24872",
    "locationId": 131345,
    "appstoreName": "... all around IT! We love IT, we live IT!",
    "facebookId": "774115049344832"
},
{
    "siteId": "64941-21195",
    "locationId": 25842,
    "appstoreName": "?????? ?G??? ??S G?? ????? I love GREECE",
    "facebookId": "190016841041353"
},
{
    "siteId": "64940-09652",
    "locationId": 21902,
    "appstoreName": "4LoverswLove",
    "facebookId": "250498645046942"
}];
(function (tappProject, chayns, window, undefined) {
    'use strict';

    tappProject.init = function init(data) {
        chayns.ready.then(() => {
            chayns.ui.initAll();

            let $list = document.querySelector(".sitelist");


            for (let element = 0; element < elements.length; element++) {
                $list.appendChild(_listItem(elements[element]));
            }

            //_listItem();

        })
    };

    function _listItem({ siteId, locationId, appstoreName, facebookId }) {
        let listItem = document.createElement("div");
        listItem.className = "listItem";
        let icon = document.createElement("img");
        icon.src = "https://via.placeholder.com/150";
        icon.className = "icon";
        listItem.appendChild(icon);
        let title = document.createElement("h3");
        title.innerHTML = appstoreName;
        listItem.appendChild(title);

        return listItem;
    }
    function _showElement() {
        if (item === element) {
            item.style.display = 'block';
        }
        else {
            item.style.display = 'none';
        }
    }

    async function _reload() {
        fetch('https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(JSON.stringify(myJson));
            });
    }

})((window.tappProject = {}), chayns, window);
tappProject.init();