import Timetracker from "./timetracker.jsx";
import React from "react";
import { state,StateContext } from "context/time_context";


export default class App extends React.Component {

    static contextType = StateContext;
    constructor(props) {
        super(props);

        // 初始化数据.
        // size: 尺寸
        // labels: 数据
        // date: 日期
        this.handlePosition = this.handlePosition.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.state = state;
    }


    handlePosition(x, y) {
        // x = x > rulerHeight ? 0 : (y < offsetX ? offsetX : x)
        // y = y > timeWidth ? 0 : (y < offsetY ? offsetY : y)
        this.setState(() => ({
            position: { left: x, top: y }
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
                    colors: this.state.colors,
                    labels: this.state.labels, // 事件标签
                    weekArr: this.state.weekArr, // 一周的显示方法
                    position: this.state.position, // 坐标,
                    handleDate: this.handleDate, // 设置时间
                    handlePositionX: this.handlePositionX,
                    handlePositionY: this.handlePositionY,
                    // handleLabels: this.handleLabels, // 设置 labels? 不应该在设置时间的时候修改吗
                    handlePosition: this.handlePosition, // 设置坐标
                }}
            >
                <Timetracker />
            </StateContext.Provider>
        )
    }

}


