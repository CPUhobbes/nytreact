import React from "react";

// Import sub-components
import Search from "./children/search";
import Results from "./children/results";

// Helper Function
import helpers from "./utils/helpers";

import Perf from 'react-addons-perf';

// Create the Parent Component
class Main extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      searchTerm: "",
      startYear:"",
      endYear:"",
      numArticles:"5",
      results: [{title:"", abstract:"", url:""}] 
    };

    this.setAllTerm = this.setAllTerm.bind(this);
   // this.setArticles = this.setArticles.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if ((prevState.searchTerm !== this.state.searchTerm) || 
      (prevState.numArticles !== this.state.numArticles) ||
      (prevState.startYear !== this.state.startYear) ||
      (prevState.endYear !== this.state.endYear)) {
      
      console.log("UPDATED");
      console.log("=", this.state.searchTerm, this.state.startYear, this.state.endYear, this.state.numArticles,"=");
      helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then((data) => {
        if (data !== this.state.results) {
          var arr = [];
          console.log("NumArt="+this.state.numArticles)
          var numArt = this.state.numArticles;
          data.forEach(function(val, index){
            if(index<numArt){
              arr.push({title:val.headline.print_headline, abstract: val.snippet, url:val.web_url});
            }

          })
          this.setState({ results: arr });
          console.log(this.state.results);
        }
      });
    }
  }

  // setTerm(searchTerm) {
  //   this.setState({
  //     searchTerm: searchTerm
  //   });
  // }

  // setArticles(numArticles) {
  //   this.setState({
  //     numArticles: numArticles
  //   });
  // }

  setAllTerm(data) {
    this.setState({
      searchTerm: data.searchTerm,
      numArticles: data.numArticles,
      endYear:data.endYear,
      startYear: data.startYear
    });
  }

	// Here we crate the render function for what will be displayed on page.
	render(){

		return(

			<div className="container">
				<div className="jumbotron header_bg">
					<h1 className="headerText">NY Times Article Search</h1>
				</div>
				<Search setTerm={this.setTerm} setArticles={this.setArticles} setAllTerm={this.setAllTerm}/>
				<Results results={this.state.results} />
			</div>
		)
	}
}

// Export the component back for use in other files
export default Main;