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
    color: [{
        id: 1,
        labelName: "出行",
        color: "#ffffff",
        backgroundColor: "#fec25a"
    }],
    labels: [{
        id: 1,
        date: "2019/10/25",
        startTime: "12:00",
        endTime: "15:00",
        backgroundColor: "#fec25a",
        labelName: "出行",
        color: "#ffffff",
        content: "今天出行很 OK 啦"
    }, {
        id: 1,
        date: "2019/10/24",
        startTime: "14:00",
        endTime: "16:00",
        backgroundColor: "#fec25a",
        labelName: "出行",
        color: "#ffffff",
        content: "今天也很 OK 喔"
    }],
}

const StateContext = React.createContext(state);

export {state, StateContext};
