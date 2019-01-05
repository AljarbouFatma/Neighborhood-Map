const formatQueryString = objectofStuff =>  Object.keys(objectofStuff).map(key => key + '=' + objectofStuff[key]).join('&')

const fourSquareRequest = (type, params) => "https://api.foursquare.com/v2/venues/" + type + "?" + formatQueryString({
  client_id:"AOYEUOFSLDFJI2A0IRVLHJA0SS0TNS3W1P4AO5USMDJ4AVH2",
  client_secret:"WETOABHTGSZHAJJOXQIJPDEQ52ETJLLMJVJOE4JZVHSEWHDZ",
  v:20180323,
  ...params
})

export default fourSquareRequest
