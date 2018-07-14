import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import ShowInactiveButton from './components/ShowInactiveButton';
import { connect } from 'react-redux';
import * as actions from './actions/index'


class App extends Component {


	onOpenForm = () => {
		this.props.onOpenForm();
	}


	onAddTask() {
		let tasks = this.state.tasks;
		let task = this.state.task;
		if (task.id === undefined)
			task.id = Date.now().toString();
		else {
			tasks = tasks.filter((_task) => _task.id !== task.id)
		}

		tasks.push(task);
		this.setState({
			tasks: tasks,
			task: {
				taskName: '',
				status: true
			}
		}, () => this.storeData());
		this.onCloseForm();
	}

	render() {

		let taskViewClassName = () => {
			if (this.props.isOpened)
				return "col-xs-8 col-sm-8 col-md-8 col-lg-8"
			return "col-xs-12 col-sm-12 col-md-12 col-lg-12"
		}

		return (

			<div className="container" style={{ marginTop: 50 }} >
				<legend className="text-center"><h1>Task Management</h1></legend>
				<p className="text-center"><em>Only you can see your tasks because data is stored in your local machine!</em></p>
				<div className="row">
					<TaskForm />
					<div className={taskViewClassName()}>

						<button type="button"
							className="btn btn-success"
							onClick={this.onOpenForm}>
							<span className="fas fa-plus"></span> Add Task
						</button>

						<ShowInactiveButton />

						<SearchBar />
						<TaskList />
					</div>
				</div>
			</ div>
		);
	}
}
let mapStateToProps = (state) => {
	return {
		isOpened: state.isOpened,
		isShowInactive: state.isShowInactive
	}
}

let mapDispatchToProps = (dispatch, props) => {
	return {
		onCloseForm: () => {
			dispatch(actions.closeForm())
		},
		onOpenForm: () => {
			dispatch(actions.openForm())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
