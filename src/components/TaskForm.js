import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions'

class TaskForm extends Component {

	constructor(props) {
		super(props);
		this.onHandleChanged = this.onHandleChanged.bind(this);
		this.onSubmitTask = this.onSubmitTask.bind(this);
		this.state = {
			taskName: '',
			status: true
		}

	}

	onHandleChanged(event) {
		let target = event.target;
		let name = target.name;
		let value = target.type === 'select-one' ? target.value === 'true' ? true : false : target.value;
		this.setState({
			[name]: value
		})


	}

	onSubmitTask(event) {
		event.preventDefault();
		if (this.state.taskName !== '') {
			this.props.onSubmitTask(this.state);
			this.onResetForm();
			
		}

	}

	onCloseForm = () => {
		this.props.onCloseForm();
	}

	onResetForm = () => {
		this.setState({
			taskName: '',
			status: true
		})
		this.onCloseForm();
	}


	componentWillReceiveProps(props) {
		if (props.selectedTask)
			this.setState({
				id: props.selectedTask.id,
				taskName: props.selectedTask.taskName,
				status: props.selectedTask.status
			})

	}


	render() {

		let isDisplay = () => {
			if (this.props.isOpened)
				return {}
			return {
				display: "none"
			}

		}

		return (

			<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
				style={isDisplay()}
			>
				<div className="panel panel-info">
					<div className="panel-heading">
						<h3 className="panel-title">
							Add To-do
          					<span className="fa fa-times-circle pull-right"
								onClick={this.onCloseForm}></span>
						</h3>

					</div>
					<div className="panel-body">

						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<form className="form-horizontal" >
								<div className="form-group">
									<label>Task name:</label>
									<input type="text"
										name="taskName"
										className="form-control"
										required="required"
										value={this.state.taskName}
										onChange={this.onHandleChanged} />
								</div>

								<div className="form-group">
									<label>Status</label>
									<select name="status"
										className="form-control"
										value={this.state.status}
										onChange={this.onHandleChanged}>

										<option value={true}>Active</option>
										<option value={false}>Inactive</option>
									</select>
								</div>

								<div className="form-group text-center">
									<button type="reset" className="btn btn-warning" onClick={this.onResetForm}>Cancel</button>
									&nbsp;
									<button type="submit" className="btn btn-primary" onClick={this.onSubmitTask}>Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		isOpened: state.isOpened,
		selectedTask: state.selectedTask
	}
}

let mapDispatchToProps = (dispatch, props) => {
	return {
		onCloseForm: () => {
			dispatch(actions.closeForm())
		},
		onSubmitTask: (task) => {
			dispatch(actions.submitTask(task))
		},
		onEdit: (task) => {
			dispatch(actions.editTask(task))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
