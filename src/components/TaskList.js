import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'


class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: undefined,
            asc: undefined
        }
    }

    sortBy = (property) => {
        if (this.state.sort === property) {
            this.setState({
                asc: !this.state.asc
            })
        } else {
            this.setState({
                sort: property,
                asc: true
            })
        }
    }



    onChangeStatus = (id) => {
        this.props.onChangeStatus(id)
    }

    onDelete = (id) => {
        this.props.onDelete(id)
    }

    onEdit = (task) => {


        this.props.onOpenForm();
        this.props.onEdit(task);
    }

    render() {
        let btnSort = (property) => {
            let icon;
            if (this.state.sort === property)
                if (this.state.asc)
                    icon = this.state.sort === 'name' ? 'sort-alpha-down' : 'sort-amount-down';
                else
                    icon = this.state.sort === 'name' ? 'sort-alpha-up' : 'sort-amount-up';
            else
                icon = 'sort';

            return <span
                style={{ padding: 3 }}
                className={"fas fa-" + icon + " pull-right"}
                onClick={() => this.sortBy(property)}></span>
        }


        let tasks = this.props.taskList
            .filter(task => task.taskName.includes(this.props.searchQuery) && (this.props.isShowInactive || task.status))

        if (this.state.sort !== undefined) {
            if (this.state.sort === 'name') {
                tasks = tasks.sort((a, b) => {
                    return a.taskName.localeCompare(b.taskName)
                })
                if (!this.state.asc) {
                    tasks.reverse()
                }
            }
            if (this.state.sort === 'status') {
                tasks = tasks.sort((a, b) => {
                    return a.status.toString().localeCompare(b.status.toString())
                })
                if (!this.state.asc) {
                    tasks.reverse()
                }
            }
        }

        let elmTasks = tasks.map((task, index) => {

            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.taskName}</td>
                    <td className="text-center">
                        <button type="button"
                            className={task.status ? "btn btn-xs btn-success" : "btn btn-xs btn-disable"}
                            onClick={() => this.onChangeStatus(task.id)}>{task.status ? "Active" : "Inactive"} </button>
                    </td>
                    <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <button type="button" className="btn btn-danger" onClick={() => this.onDelete(task.id)}><span className="fas fa-trash-alt"></span> Delete</button>
                        &nbsp;
                    <button type="button" className="btn btn-warning" onClick={() => this.onEdit(task)}><span className="fas fa-pencil-alt"></span> Edit</button>
                    </td>
                </tr>
            );

        })

        return (
            <div className="row top-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center" style={{ width: '100%' }}>Task name{btnSort('name')}
                                </th>
                                <th className="text-center" style={{ minWidth: 100 }}>Status{btnSort('status')}
                                </th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskList: state.tasks,
        isShowInactive: state.isShowInactive,
        searchQuery: state.searchQuery
    }
}

let mapDispatchToProps = (dispatch, props) => {
    return {
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onEdit: (task) => {
            dispatch(actions.editTask(task))
        },
        onDelete: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onChangeStatus: (id) => {
            dispatch(actions.toggleStatus(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

