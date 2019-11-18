import Timetracker from "./timetracker.jsx";
import React from "react";
import { state } from "context/time_context";
import { TYPE } from "./projectManage.jsx";


export default class App extends React.Component {
    constructor(props) {
        super(props);


        this.state = state;

        this.handlePosition = this.handlePosition.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.handleSetLabel = this.handleSetLabel.bind(this);
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

    handleSetLabel(type, label) {
        let labels = this.state.labels;
        switch (type) {
            case TYPE.ADD_PROJECT: // 添加操作
                label = { ...label, id: new Date().getTime() }
                this.setState({
                    labels: [
                        ...labels,
                        label
                    ]
                })
                return true
            case TYPE.CHANGE_PROJECT: // 修改操作
                labels.findIndex((v) => (v.id == label.id))
                if (i < 0) {
                    return false
                }
                labels[i] = label
                this.setState(labels)
                return true
            case TYPE.REMOVE_PROJECT: // 删除操作
                labels.findIndex((v) => (v.id == label.id))
                if (i < 0) {
                    return false
                }
                labels.splice(i, 1)
                this.setState(labels)
                return true
        }
    }

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
                handleSetLabel={this.handleSetLabel}
                handlePositionX={this.handlePositionX}
                handlePositionY={this.handlePositionY}
                handlePosition={this.handlePosition}
            />
        )
    }

}


