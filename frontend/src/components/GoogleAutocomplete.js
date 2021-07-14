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
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    this.autocompleteInput = this.autocomplete.getPlace().formatted_address;
    
    //TODO: Not sure how but we need to return this value (this.autocompleteInput) to EventMakeUI.
    alert(this.autocompleteInput);

  }

  render() {
    return (
        
        <input ref={this.autocompleteInput} id="autocomplete" placeholder="Enter desired location"
         type="text"></input>
    );
  }
}

export default GoogleAutocomplete