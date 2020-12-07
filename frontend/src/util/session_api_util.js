import axios from 'axios';

const request = require('request');
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

// export const getFeed = () => {
  
  
//   axios.defaults.headers.common['x-api-key'] = 'Y6uzeeKW5s58j2e1NxdDMDBKAyT1o4N7rltQeqW6';
//   return axios.get(
//     "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g"
//     ).then(res => {
//       console.log(res)
//         let x = res.data
//         debugger
//         var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.create(res.data);
//         var feed2 = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(res.data);
        
//         feed.entity.forEach(function (entity) {
//           if (entity.trip_update) {
//             console.log(entity.trip_update);
//           }
//         });
        
//         return {train : feed.entity}
//       })
    
    
  

// }

var requestSettings = {
  method: 'GET',
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
  encoding: null,
  headers: {
    'x-api-key': 'Y6uzeeKW5s58j2e1NxdDMDBKAyT1o4N7rltQeqW6'
  }
  
};
let x = []

export const getFeed = async function(){
  
  return request(requestSettings, function (error, response, body,) {
  
    if (!error && response.statusCode === 200) {
      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      feed.entity.forEach(function (entity) {
        x.push(entity)
        if (entity.trip_update) {
          console.log(entity.trip_update);
        }
      });
      
      debugger
      return {train : feed.entity}
    }
  });
}



// // var request = require('request');

// // var requestSettings = {
// //   method: 'GET',
// //   url: 'URL OF YOUR GTFS-REALTIME SOURCE GOES HERE',
// //   encoding: null
// // };
// request(requestSettings, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
//     feed.entity.forEach(function (entity) {
//       if (entity.trip_update) {
//         console.log(entity.trip_update);
//       }
//     });
//   }
// });