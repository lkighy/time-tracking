import React from "react";
import {getStore} from "../utils/storage";

let labels = JSON.parse(getStore("labels"))
// let colors = JSON.parse(getStore("labelColors"))

let state = {
    weekArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    position: {
        top: 0,
        left: 0
    },
    size: {
        width: 1680,
        height: 1440,
        offsetX: 88,
        offsetY: 48,
    },
    date: {
        toYear: 2019,
        toMonth: 1,
        toDay: 1,
        year: 0,
        month: 0,
        date: 0
    },
    colors: [{
        id: 1,
        labelName: "出行",
        fontColor: "#ffffff",
        backgroundColor: "#fec25a"
    },{
        id: 2,
        labelName: "旅游",
        fontColor: "#ffffff",
        backgroundColor: "#1e5b5e"
    },{
        id: 3,
        labelName: "购物",
        fontColor: "#ffffff",
        backgroundColor: "skyblue"
    }],
    labels: labels ? labels : [],
}

const StateContext = React.createContext(state);

export {state, StateContext};
