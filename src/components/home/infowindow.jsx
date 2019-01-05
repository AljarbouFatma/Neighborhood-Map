import React, { Component } from 'react'
const {
  Marker,
  InfoWindow,
} = require("react-google-maps");

/*global google*/

export default class GoogleMarker extends Component {

  state = {
    isOpen: false,
    photoInfo: null,
    locationType: null
  }


  componentWillReceiveProps(nextProps) {  // this will make the side pane name clicked activate the corresponding name's google marker info window, opening it
   if (nextProps.activeIndex !== this.props.activeIndex) {
    if (nextProps.activeIndex === this.props.index) {
     this.onToggleOpen()
    }
   }
  }

  onToggleOpen = ()  => {         // manages whether infowindow is open and makes a fetch call for details of this particular venue and stores info in state
    if (!this.state.photoInfo) {
      fetch(
        this.props.fourSquareRequest( `${this.props.v[3]}`  , {
          limit: 2
        })
      ).then(response => {
        response.json().then(data => {
          this.setState({
            photoInfo: data.response.venue.photos.groups.length ? data.response.venue.photos.groups[0].items[0] : null,
            locationType: data.response.venue.categories[0] ? data.response.venue.categories[0].pluralName : null
          })
        }
      )
    })
  }
  this.setState({
    isOpen: !this.state.isOpen
  })
}

render() {
  const { markerLat, markerLng} = this.props
  const { isOpen, photoInfo, locationType } = this.state
  return (

    <Marker
      position={{ lat: markerLat, lng: markerLng }}
      defaultAnimation={google.maps.Animation.DROP}
      onClick={this.onToggleOpen}
      style={{overflow: 'hidden'}}
      icon={{
        url:"http://www.myiconfinder.com/uploads/iconsets/48-48-7a195b78d9607a48fb234f98634fa5ea-pin.png"
      }}
      >
        {isOpen &&
          <InfoWindow
            onCloseClick={() => this.setState({isOpen: !isOpen})}
            >
              <div
                className={"grid-x align-middle align-center text-center" + isOpen ? "pulseDrag" : null}
                style={{maxWidth: '250px'}}
                >
                  <h5 className="cell">
                    {this.props.placeName}
                  </h5>
                  {
                    locationType ?
                    <h6 className="cell">{locationType}</h6>
                    :
                    null
                  }
                  {
                    photoInfo ?

                    <img
                      className="cell"
                      alt={locationType ? locationType : null}    // type of category listed in inventory window
                      src={`${photoInfo.prefix}${photoInfo.height}x${photoInfo.width}${photoInfo.suffix}`}   // renders photo stored in state when fetch call is made for it
                      style={{maxHeight:'200px', maxWidth:'200px'}}
                    />
                    :
                    null
                  }
                </div>
              </InfoWindow>
            }
          </Marker>

        )
      }
    }
