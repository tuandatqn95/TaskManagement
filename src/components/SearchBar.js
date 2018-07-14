import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions'

class SearchBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.onHandleChanged = this.onHandleChanged.bind(this);
    }

    onHandleChanged(event) {

       
        let value = event.target.value;
      


        this.props.onSearch(value)
    }

    render() {
        return (

            <div className="row top-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <input type="text"
                        className="form-control"
                        name="search"
                        placeholder="Search..."
                        value={this.props.search}
                        onChange={this.onHandleChanged} />
                </div>
            </div>


        );
    }
}
let mapStateToProps = (state) => {
    return {
        searchQuery: state.searchQuery
    }
}
let mapDispatchToProps = (dispatch, props) => {
    return {

        onSearch: (query) => {
            dispatch(actions.searchTask(query))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

