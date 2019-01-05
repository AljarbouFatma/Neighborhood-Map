import React, { Component } from 'react'
import GoogleMarker from './infowindow'
import escapeRegExp from 'escape-string-regexp';
const { compose } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
const fancyMapStyles = require("./fancyMapStyles.json");

const callback = (data, err) => {
  if (err) return
  console.log(`${err}`)
}
const formatQueryString = objectofStuff =>  Object.keys(objectofStuff).map(key => key + '=' + objectofStuff[key]).join('&')     // API Request my auth tokens
const fourSquareRequest = (type, params) => "https://api.foursquare.com/v2/venues/" + type + "?" + formatQueryString({
  client_id:"AOYEUOFSLDFJI2A0IRVLHJA0SS0TNS3W1P4AO5USMDJ4AVH2",
  client_secret:"WETOABHTGSZHAJJOXQIJPDEQ52ETJLLMJVJOE4JZVHSEWHDZ",
  v:20180323,
  ...params
})



const MapWithAMakredInfoWindow = compose(   // Higher Order Component for my google map
  withScriptjs,
  withGoogleMap
)(props => {

  return (
    <GoogleMap
      defaultZoom={19}
      defaultOptions={{
        styles: fancyMapStyles,
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
      defaultCenter={{lat: 34.146299, lng: -118.255005 }}  // defaults to this location while map fetches your current location
      ref={ref => this.googleMap = ref}
      {...props}
      >
        {props.venues ? this.googleMap && this.googleMap.panTo({  // Goes to location of your current location once it loads
          lat:34.146299,
          lng:-118.255001
        }) : null}
        { props.placesInfo ?    // Render 8 map markers of places nearby to your current location
          props.placesInfo
          .map( (v,i) =>
          <GoogleMarker
            key={i}
            placeName = { v[0] }
            markerLat={ v[1] }
            markerLng={ v[2] }
            fourSquareRequest={ fourSquareRequest }
            activeIndex = {props.activeIndex}
            index = {i}
            v={ v }
          />

        )
        :
        null
      }

    </GoogleMap>
  )
})

class Home extends Component {

  state = {
    venues: null,   // manages list of the 8 venues nearest to your
    inputChar: '',   // manages the search box state
    venueInfo: null,  // manages info of the venues useful info
    checked: false,    // manages whether side pane is open or not
    activeIndex: null
  }



  inputDetect = (query) => {
    this.setState({ inputChar: query })
  }


  fetchApi = () => {
          const myRequest = fourSquareRequest("search", {   // fetch request to foursquare api with parameters
            ll:34.146299+','+-118.255005
          })
          fetch(myRequest).then(response => {
              response.json().then(data => {
                this.setState({
                  venues: data.response.venues.splice(0,8),
                  venueInfo: data.response.venues.splice(0,8).map(ven => [ven.name, ven.location.lat, ven.location.lng, ven.id]),
                })

                callback(null,data)
              })
          }).catch(error => {
            console.log(error)
            callback(error)
          })
        }

  componentDidMount() {
    this.fetchApi()
  }

  render() {
    const {venues, inputChar, venueInfo, checked, activeIndex} = this.state
    let placesInfo = null;
    if (venueInfo) {
      placesInfo = venueInfo
    }

    if (inputChar)  {
      const match = new RegExp(escapeRegExp(inputChar), 'i')    // reg exp finds pattern to match side pane places with search box
      placesInfo = venueInfo.filter(
        (place) => match.test(place[0])
      )
    } else {
      placesInfo = venueInfo
    }
    return (
      <main>
        <ul className="navigation">
          <section  className="grid-x">
            <div id="sidePane" className="align-center cell large-3 medium-4 small-4">
              <h2 style={{textAlign: 'center', color: '#1f8a70', fontWeight: 'bold'}}>Locations Near You</h2>
              <input
                type="text"
                placeholder="Search Place"
                value={inputChar}
                onChange={(event) => {
                  this.inputDetect(event.target.value)}}
                />
                <ul>
                  {venueInfo ?
                    placesInfo.map( (v,i) => {
                      return (
                        <li
                          className="nav-item"
                          key={i}
                          onClick={() => {
                           console.log('clicked')
                            this.setState({
                              activeIndex: i,
                              checked: !checked
                            })
                           }
                          }
                          >
                          <hr></hr>
                          <p id="placesInfo ">{placesInfo.map(v =>
                            v[0])[i]}
                          </p>
                        </li>
                      )
                    }
                  )
                  :
                  null
                }
              </ul>
            </div>
          </section>
        </ul>
          <input onClick={() => this.setState({checked: !checked})} type="checkbox" checked={checked} id="nav-trigger" className="nav-trigger " />
          <label htmlFor="nav-trigger"></label>

          <div className="site-wrap">
            <MapWithAMakredInfoWindow     // these props are passed up to the higher order component at the top
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbEXexX7QwrK14aGMnirWoG8sdJe2p8Ds"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            venues={venues}
            placesInfo = {placesInfo}
            activeIndex = {activeIndex}
          />
        </div>
      </main>
    )
  }
}


export default Home
