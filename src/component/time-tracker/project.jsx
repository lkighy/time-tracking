import React from "react";
import "scss/project.scss";

import { ProjectForm, TYPE } from "./projectManage.jsx";


export default class Projects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            id: 0,
            color: {},
            content: "",
            date: "",
            startTime: "",
            endTime: "",
        }

        this.handleSetDisplay = this.handleSetDisplay.bind(this)
        this.handleSetData = this.handleSetData.bind(this)
    }

    handleSetDisplay(display) {
        this.setState({ display })
    }

    handleSetData(label) {
        this.setState({ ...label })
    }

    render() {
        let projects = [];
        this.props.labels.forEach((lab) => {
            if (this.props.dateRange.join(",").indexOf(lab.date) >= 0) {
                projects.push(
                    <Project key={lab.id} {...lab}
                        handleSetData={this.handleSetData}
                        handleSetDisplay={this.handleSetDisplay}
                    />
                )
            }
        })
        // 判空, 如果为空, 则表示这周没有任务 ...
        return (
            <div className="projects">
                {projects.length == 0 ? <div className="empty">
                    这周还没有任务喔, 快去新建一个吧
                </div> : ""}
                {projects}

                {/* 浮动的窗口, 这是一个修改的窗口,  */}
                {this.state.display ?
                    (<ProjectForm
                        status={TYPE.CHANGE_PROJECT} // 设定这是 修改状态
                        handleSetDisplay={this.handleSetDisplay}

                        handleSetLabel={this.props.handleSetLabel}

                        id={this.state.id}
                        date={this.state.date}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        color={this.state.color}
                        content={this.state.content}

                        colors={this.props.colors}
                    />) : ""
                }
            </div>
        )
    }
}


class Project extends React.Component {
    constructor(props) {
        super(props);

        // 状态码 3个 0: 时间未到 1: 时间之中 2: 过了
        // 0: #e69500 // 黄色
        // 1: #346bd2 // 蓝色
        // 2: #5ec334 // 绿色
        this.state = {
            status: 0
        }
        this.handleStatus = this.handleStatus.bind(this)
        this.handleSetData = this.handleSetData.bind(this)
    }

    componentDidMount() {
        this.handleStatus()
    }

    handleStatus() {
        // 获取当前的时间的时间戳
        let date = new Date().getTime();
        // 获取传入的时间,检查是否
        let startDate = new Date(this.props.date + " " + this.props.startTime).getTime();
        let endDate = new Date(this.props.date + " " + this.props.endTime).getTime();
        if (startDate > date) { // 如果还没到这个时间, 则表示状态 0
            this.setState({ status: 0 })
        } else if (endDate < date) { // 结束
            this.setState({ status: 2 })
        } else {
            this.setState({ status: 1 })
        }
    }

    handleSetData() {

        this.props.handleSetData({
            id: this.props.id,
            color: this.props.color,
            content: this.props.content,
            date: this.props.date,
            startTime: this.props.startTime,
            endTime: this.props.endTime
        })

        this.props.handleSetDisplay(true)
    }

    // 需要判断状态码?
    render() {
        let style;
        if (this.state.status == 0) {
            style = "project icon-wait project-wait"
        } else if (this.state.status == 1) {
            style = "project icon-goon project-goon"
        } else {
            style = "project icon-done project-done"
        }

        // 点击显示 修改列表
        return (<div className={style}
            onClick={this.handleSetData}
        >
            <span className="label-name">{this.props.color.labelName}</span>
            <span className="content">{this.props.content}</span>
        </div>)
    }

}