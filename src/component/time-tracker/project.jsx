import React from "react";
import "scss/project.scss";


export default class Projects extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let projects = [];
        this.props.labels.forEach((lab) => {
            if (this.props.dateRange.join(",").indexOf(lab.date) >= 0) {
                projects.push(
                    <Project key={lab.id} {...lab} />
                )
            }
        })
        // 判空, 如果为空, 则表示这周没有任务 ...
        return (
            <div className="projects">
                {projects.length == 0 ?<div className="empty">
                    这周还没有任务喔, 快去新建一个吧
                </div> : ""}
                {projects}
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
            onClick=""
        >
            <span className="label-name">{this.props.color.labelName}</span>
            <span className="content">{this.props.content}</span>
        </div>)
    }

}