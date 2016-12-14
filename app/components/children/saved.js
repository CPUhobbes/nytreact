import React from "react";

class Saved extends React.Component {
  	constructor(props) {
    	super(props);

	    this.state = {
	    	id: ""
	    };
	}

	handleSubmit(event) {
    event.preventDefault();
    console.log("CLICK");
    //console.log(event.target.title.value, event.target.this.url.value)
    this.state.title = event.target.id.value;
    //console.log(this.state);
    this.props.setSaveData(this.state);
    this.setState({id: ""});
  }

	render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">

          <h1>Saved Articles!!</h1>
          <div>
            {this.props.results.length > 0 && this.props.results[0].title!="" &&
                this.props.results.map(function(data, i) {
                  return <div key={i} className='articleContainer'>
                            <form onSubmit={this.handleSubmit}>
                            <input type="hidden" id="title"
                            defaultValue={data.id} ref={(id) => this.id = id} />
                            <h2>{data.title}</h2>
                            <p>{data.abstract}</p>
                            <p>{data.url}</p>
                            <p><button type="submit" className="btn btn-default" id="runSearch">Save Article</button></p>
                            </form>
                  </div>
                }, this)
          }
        </div>
        </div>
      </div>
    );
  }
}

// Export the component back for use in other files
export default Saved;
