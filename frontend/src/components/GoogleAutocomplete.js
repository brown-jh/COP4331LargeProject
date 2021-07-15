import React from "react";
/* global google */

// Help from: https://stackoverflow.com/questions/52907859/using-google-place-autocomplete-api-in-react

class GoogleAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace().formatted_address;
    this.props.onPlaceLoaded(place);
  }

  render() {
    return (
        <input ref={this.autocompleteInput} placeholder="Enter desired location"
         type="text" id="location"></input>
    );
  }
}

export default GoogleAutocomplete