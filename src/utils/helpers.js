const endPoint = 'https://api.foursquare.com/v2/venues/search?';
const client_id =  '4WJPHW0P5XVZAMPLU4CLCKLVX40H31EBRQETNUILL14Y5NRU';
const client_secret = 'GS5PZOL2XIQX1F4SIKES10P5RQ11HZXIJH0BUIPPIFVFCY0D';


const limit = 1;
const v = 20180115;









export const getData = (lat, lng) => {
  const url = `${endPoint}client_id=${client_id}&client_secret=${client_secret}&ll=${lat},${lng}&limit=${limit}&v=${v}`
   return fetch(url)
     .then(response => response.json())
}

export const getLocationImg = (location_id) => {
  const url = `https://api.foursquare.com/v2/venues/${location_id}/photos?client_id=${client_id}&client_secret=${client_secret}&v=${v}`;
  return fetch(url)
    .then(response => response.json())
}

export const camelize = (str) => {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}
