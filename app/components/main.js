import React from "react";

// Import sub-components
import Search from "./search";
import Results from "./results";

// Helper Function
import helpers from "./utils/helpers";

// Create the Parent Component
class Main extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      searchTerm: "",
      results: ""
    };

    this.setTerm = this.setTerm.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then((data) => {
        if (data !== this.state.results) {
          console.log(data);

          this.setState({ results: data });
        }
      });
    }
  }

  setTerm(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    });
  }

	// Here we crate the render function for what will be displayed on page.
	render(){

		return(

			<div className="container">
				<div className="jumbotron header_bg">
					<h1 className="headerText">NY Times Article Search</h1>
				</div>
				<Search setTerm={this.setTerm}/>
				<Results address={this.state.results} />
			</div>
		)
	}
}

// Export the component back for use in other files
export default Main;