import React from "react";

// Import sub-components
import Search from "./children/search";
import Results from "./children/results";
import Saved from "./children/saved";

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
      results: [{title:"", abstract:"", url:""}],

      title: "",
      abstract:"",
      url:"",

      savedArticles:[{_id:"test", title:"test", abstract:"test", url:"test"}],
      deleteID:""
    };

    this.save = {
      
    };

    this.setAllTerm = this.setAllTerm.bind(this);
    this.setSaveData = this.setSaveData.bind(this);
    this.setDelete = this.setDelete.bind(this);

    //this.state.savedArticles = [{title:"testing", abstract:"test", url:"www"}];
  }

  componentDidUpdate(prevProps, prevState) {

    //Check for updated search form
    if ((prevState.searchTerm !== this.state.searchTerm) || 
      (prevState.numArticles !== this.state.numArticles) ||
      (prevState.startYear !== this.state.startYear) ||
      (prevState.endYear !== this.state.endYear)) {
      console.log("UPDATED");
      //console.log("=", this.state.searchTerm, this.state.startYear, this.state.endYear, this.state.numArticles,"=");
      helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then((data) => {
        if (data !== this.state.results) {
          var arr = [];
          //console.log(data);
          var numArt = this.state.numArticles;
          data.forEach(function(val, index){
            if(index<numArt){

              //print_headline or main object maybe null/undefined, check to see which one is valid
              var newTitle;
              if(typeof val.headline.print_headline === "undefined"){
                newTitle = val.headline.main;
              }
              else{
                newTitle=val.headline.print_headline
              }
              arr.push({title:newTitle, abstract: val.snippet, url:val.web_url});
            }

          })
          this.setState({ results: arr });
            //console.log(this.state.results);
        }
      });
    }

    //Check if article needs to be added to Database
    else if(prevState.title !== this.state.title){
      helpers.saveArticle(this.state).then((data) => {
        console.log(data, "added")
        this.setState({
        savedArticles:data
      });
      });

    }

    if(prevState.deleteID !== this.state.deleteID){
    helpers.deleteArticle(this.state.deleteID).then((data) => {
        console.log(data, "hit");
        this.setState({
        savedArticles:data
      });
      //console.log(this.state.savedArticles);
      });
    }
  }

  setSaveData(data){
    this.setState({
      title: data.title,
      abstract: data.abstract,
      url: data.url
    });
  }

  setAllTerm(data) {
    this.setState({
      searchTerm: data.searchTerm,
      numArticles: data.numArticles,
      endYear:data.endYear,
      startYear: data.startYear
    });
  }

  setDelete(data){
    console.log(data, "asdasda");
    this.setState({
      deleteID:data
    });
  }

  componentWillMount(){
    console.log("Willmounted");
    helpers.getArticles().then((data) => {
       this.setState({
        savedArticles:data
      });

    });
    }

	// Here we crate the render function for what will be displayed on page.
	render(){

		return(

			<div className="container">
				<div className="jumbotron header_bg">
					<h1 className="headerText">NY Times Article Search</h1>
				</div>
				<Search setAllTerm={this.setAllTerm}/>
				<Results results={this.state.results} setSaveData={this.setSaveData}/>
        <Saved results ={this.state.savedArticles} setDelete={this.setDelete} />
			</div>
		)
	}
}

// Export the component back for use in other files
export default Main;