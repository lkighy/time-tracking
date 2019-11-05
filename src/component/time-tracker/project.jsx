import React from "react";
import "scss/project.scss";


export default class Projects extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let projects = [];
        this.props.labels.forEach((lab) => {
            projects.push(
                <Project key={lab.id} {...lab} />
            )
        })
        return (
            <div className="projects">
                {projects}
            </div>
        )
    }
}


class Project extends React.Component {
    constructor(props) {
        super(props);

        // 状态码 3个 0: 时间未到 1: 时间之中 2: 过了
        this.state = {
            status: 0
        }
    }

    // 需要判断状态码?

    render() {
        return (<div className="project">
            <span className="icon">图标</span>
            <span className="label-name">{this.props.labelName}</span>
            <span className="content">{this.props.content}</span>
        </div>)
    }

}