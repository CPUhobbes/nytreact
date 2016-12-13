// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Geocoder API
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

  runQuery: (article, begin, end) => {
  	let addYear="";
    console.log(article, begin, end);


    //TODO  ----  ERROR CHECKING ON DATES
    if(begin!==""){
    	addYear+="&begin_date="+begin+"0101";
    }
    if(end!==""){
    	addYear+="&end_date="+end+"0101";
    }


    // Figure out the geolocation
    const queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q="+article+"&sort=newest"+addYear;

    return axios.get(queryURL).then((response) => {

      //console.log(response.data.response.docs);
      return response.data.response.docs;
    });

  }
};

// We export the helpers function (which contains getGithubInfo)
export default helpers;