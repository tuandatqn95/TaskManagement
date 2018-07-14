import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions'

class ShowInactiveButton extends Component {


    onHandleChanged = (event) => {
        let value = event.target.checked;
        this.props.setShowInactive(value);
    }

    render() {
        return (
            <div className="checkbox pull-right">
                <label>
                    <input name="showInactive" type="checkbox" checked={this.props.isShowInactive} onChange={this.onHandleChanged} />Show Inactive Task
				</label>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isShowInactive: state.isShowInactive
    }
}

let mapDispatchToProps = (dispatch, props) => {
    return {
        setShowInactive: (value) => {
            dispatch(actions.setShowInactive(value))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowInactiveButton);
