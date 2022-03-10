export const UPDATE_TEXTINPUT = "UPDATE_TEXTINPUT";
export const RECEIVE_GEOCODE_RESULTS = "RECEIVE_GEOCODE_RESULTS";
export const REQUEST_GEOCODE_RESULTS = "REQUEST_GEOCODE_RESULTS";
export const UPDATE_CENTER = "UPDATE_CENTER";

export const fetchHereGeocode = (payload) => (dispatch) => {
  // It dispatches a further action to let our state know that requests are about to be made (loading spinner listens to this!)
  dispatch(requestGeocodeResults());

  // we define our url and parameters to be sent along
  let url = new URL("https://geocoder.api.here.com/6.2/geocode.json"),
    params = {
      searchtext: payload.inputValue,
    };

  url.search = new URLSearchParams(params);

  // we use the fetch API to call HERE Maps with our parameters
  return (
    fetch(url)
      // when a response is returned we extract the json data
      .then((response) => response.json())
      // and this data we dispatch for processing in processGeocodeResponse
      .then((data) => dispatch(processGeocodeResponse(data)))
      .catch((error) => console.error(error))
  );
};

const parseGeocodeResponse = (json) => {
  // parsing the response, just a simple example, this could be much more complex as the response from HERE is fairly ritch
  if (json.Response && json.Response.View.length > 0) {
    let processedResults = [];

    for (const address of json.Response.View[0].Result) {
      if (address.Location && address.Location.LocationType === "point") {
        processedResults.push({
          title: address.Location.Address.Label,
          description: address.Location.Address.PostalCode,
          displayposition: {
            lat: address.Location.DisplayPosition.Latitude,
            lng: address.Location.DisplayPosition.Longitude,
          },
        });
      }
    }
    return processedResults;
  }
};

const processGeocodeResponse = (json) => (dispatch) => {
  // parse the json file and dispatch the results to receiveGeocodeResults which will be reduced
  const results = parseGeocodeResponse(json);
  // let's let the loading spinner now that it doesn't have to spin anymore
  dispatch(receiveGeocodeResults(results));
};

export const receiveGeocodeResults = (payload) => ({
  type: RECEIVE_GEOCODE_RESULTS,
  results: payload,
});

export const requestGeocodeResults = (payload) => ({
  type: REQUEST_GEOCODE_RESULTS,
  ...payload,
});

export const updateTextInput = (payload) => ({
  type: UPDATE_TEXTINPUT,
  payload,
});

export const updateCenter = (payload) => ({
  type: UPDATE_CENTER,
  ...payload,
});
