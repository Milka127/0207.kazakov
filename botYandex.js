// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       BigShow
// @match        https://yandex.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = [
    "купля-продажа авто",
    "каталог автомобилей",
    "автомобили купить",
    "б\у авто",
    "купить BMW",
    "купить Lada"
];
let num = keywords.length;
let random = getRandom(0, num);
let keyword = keywords[random];
let input = document.getElementsByName("text")[0];
let btn = document.getElementsByClassName("button mini-suggest__button")[0];
let links = document.links;

if(btn !== undefined) {
    let i = 0;
    console.log(btn);
    let timerId = setInterval(function() {
        input.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
        }
        setTimeout(clickBtn, 10000);
    },400);
} else if (location.hostname = "auto.ru") {
    setInterval(() => {
        if (getRandom(0, 101) >= 70) {
            location.href = "https://www.yandex.ru/";
        } else if (links[random].href.indexOf("auto.ru") !== -1) {
            links[random].click();
        }
    }, getRandom(1500, 5000));
} else {
    let nextPageYandex = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf("auto.ru") !== -1) {
            let link = links[i];
            let nextPageYandex = false;
            console.log("Нашел строку " + links[i]);
            // window.location.replace(link);
            setTimeout(() => {
                linkNext();
            }, getRandom(1500, 4000));
            break;
        }
    }
    if (nextPage().innerText === "5") {
        nextPageYandex = false;
        location.href = "https://www.yandex.ru/";
    }
    if (nextPageYandex) {
        setTimeout(() => {
            linkNext();
        }, getRandom(2000, 4000));
    }
}

function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}
function clickBtn() {
  document.getElementsByClassName("button mini-suggest__button")[0].click();
}
function linkNext() {
    document.getElementsByClassName("link_them_none")[0].click();
}
function nextPage() {
    document.getElementsByClassName("pager__item_current_yes")[0];
}
