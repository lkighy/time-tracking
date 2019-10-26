import Timetracker from "./timetracker.jsx";
import React from "react";
import StateContext from "context/time_context";

// const Context = React.createContext();



export default class App extends React.Component {
    constructor(props) {
        super(props);

        // 初始化数据.
        // size: 尺寸
        // labels: 数据
        // date: 日期
        this.handlePosition = this.handlePosition.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.state = {
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
    }


    handlePosition(x, y) {
        this.setState(() => ({
            size: { left: x, top: y }
        }))
    }

    handleDate(obj) {
        this.setState({
            date: obj
        })
    }

    // // setLabels(date) { // 获取 labels ,接受日期
    // // }

    render() {
        return (
            <StateContext.Provider
                value={{

                    size: this.state.size, // 尺寸
                    date: this.state.date, // 时间
                    color: this.state.color,
                    labels: this.state.labels, // 事件标签
                    weekArr: this.state.weekArr, // 一周的显示方法
                    position: this.state.position, // 坐标,
                    handleDate: this.handleDate, // 设置时间
                    // handleLabels: this.handleLabels, // 设置 labels? 不应该在设置时间的时候修改吗
                    handlePosition: this.handlePosition, // 设置坐标
                }}
            >
                <Timetracker />
            </StateContext.Provider>
        )
    }

}


