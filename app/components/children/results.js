import React from "react";

class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">

          <h1>Top Articles</h1>
          <div>
            {this.props.results.length > 0 && this.props.results[0].title!="" &&
                this.props.results.map(function(data, i) {
                  return <div key={i} className='articleContainer'>
                            <h2>{data.title}</h2>
                            <p>{data.abstract}</p>
                            <p>{data.url}</p>
                            <p><button type="submit" className="btn btn-default" id="runSearch">Save Article</button></p>
                  </div>
                })
          }
        </div>
        </div>
      </div>
    );
  }
}

// Export the component back for use in other files
export default Results;