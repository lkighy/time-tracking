import React from "react";

const state = {
    weekArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    position: {
        top: 0,
        left: 0
    },
    size: {
        width: 1440,
        height: 1680,
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
        color: "#ffffff",
        backgroundColor: "#fec25a"
    },{
        id: 2,
        labelName: "旅游",
        color: "#ffffff",
        backgroundColor: "#1e5b5e"
    },{
        id: 3,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    },{
        id: 4,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    },{
        id: 5,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    },{
        id: 6,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    },{
        id: 7,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    },{
        id: 8,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    },{
        id: 9,
        labelName: "哈哈",
        color: "#ffffff",
        backgroundColor: "skyblue"
    }],
    labels: [{
        id: 1,
        date: "2019/10/25",
        startTime: "12:00",
        endTime: "15:00",
        color: {
            id: 1,
            labelName: "出行",
            fontColor: "#ffffff",
            backgroundColor: "#fec25a"
        },
        content: "今天出行很 OK 啦"
    }, {
        id: 2,
        date: "2019/10/24",
        startTime: "14:00",
        endTime: "16:00",
        color: {
            id: 1,
            labelName: "出行",
            fontColor: "#ffffff",
            backgroundColor: "#fec25a",
        },
        content: "今天也很 OK 喔"
    }],
}

const StateContext = React.createContext(state);

export {state, StateContext};
