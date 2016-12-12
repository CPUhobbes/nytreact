"use strict";

import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	searchTerm: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("CLICK");
    console.log(this.state.searchTerm);
    this.props.setTerm(this.state.searchTerm);
    this.setState({searchTerm: "",});
  }

	// Create the render function for what gets displayed on page.
	render() {

		return(
			<div className="row">
				<div className="col-md-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="search">Search Term:</label>
							<input type="text" className="form-control" id="searchTerm" 
							value={this.state.searchTerm} onChange={this.handleChange}/>
						</div>

						<div className="form-group">
							<label htmlFor="pwd">Number of Records to Retrieve:</label>
							{/*<select className="form-control" id="numArticles">
								<option value='1'>1</option>*/}	

								{ /* Setting the option for 5 as default */ }
								{ /*<option value='5' selected>5</option>
								<option value='10'>10</option>
							</select>	*/ }	  
						</div>

						<div className="form-group">
							<label htmlFor="startYear">Start Year (Optional):</label>
							<input type="text" className="form-control" id="startYear" />
						</div>

						<div className="form-group">
							<label htmlFor="endYear">End Year (Optional):</label>
							<input type="text" className="form-control" id="endYear" />
						</div>

						<button type="submit" className="btn btn-default" id="runSearch">Search</button>
						<button type="button" className="btn btn-default" id="clearAll">Clear Results</button>
					</form>
				</div>
			</div>	
			
		)
	}
}
// Export the component back for use in other files
export default Form;