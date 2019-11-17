import Timetracker from "./timetracker.jsx";
import React from "react";
import { state } from "context/time_context";


export default class App extends React.Component {
    // static contextType = StateContext;
    constructor(props) {
        super(props);

        this.handlePosition = this.handlePosition.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.handleAddLabel = this.handleAddLabel.bind(this);

        this.state = state;
    }

    handlePosition(x, y) {
        this.setState(() => ({
            position: { left: x, top: y }
        }))
    }

    handleDate(obj) {
        this.setState({
            date: obj
        })
    }

    handleAddLabel(label) { // 添加 label
        // id 怎么指定呢 // 为了最大可修改性, label 的 id 得自己定义, 还有一个格式的验证
        let labels = this.state.labels;
        label = {id: new Date().getTime(), ...label}
        this.setState({
            labels: [
                ...labels,
                label
            ]
        })

        return true
    }
    // handleRemoveLabel(id) { // 移除指定id label

    // }

    render() {
        return (
            <Timetracker
                size={this.state.size}
                date={this.state.date}
                colors={this.state.colors}
                labels={this.state.labels}
                weekArr={this.state.weekArr}
                position={this.state.position}

                handleDate={this.handleDate}
                handleAddLabel={this.handleAddLabel}
                handlePositionX={this.handlePositionX}
                handlePositionY={this.handlePositionY}
                handlePosition={this.handlePosition}
            />
        )
    }

}


