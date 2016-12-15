import React from "react";

class Saved extends React.Component {
  	constructor(props) {
    	super(props);

	    this.state = {
	    	_id: ""
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
    event.preventDefault();
    console.log("CLICK");
    //console.log(event.target.title.value, event.target.this.url.value)
    this.state._id = event.target._id.value;
    console.log(event.target._id.value);
    this.props.setDelete(this.state._id);
    this.setState({_id: ""});
  }

	render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
        {console.log("test = ", this.props.results)}
          <h1>Saved Articles!!</h1>
          <div>
            {this.props.results.length > 0 && this.props.results[0].title!="" &&
                this.props.results.map(function(data, i) {
                  return <div key={i} className='articleContainer'>
                            <form onSubmit={this.handleSubmit}>
                            <input type="hidden" id="_id"
                            defaultValue={data._id} ref={(_id) => this._id = _id} />
                            <h2>{data.title}</h2>
                            <p>{data.abstract}</p>
                            <p>{data.url}</p>
                            <p>{data._id}</p>
                            <p><button type="submit" className="btn btn-default" id="delete">Delete Article</button></p>
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
