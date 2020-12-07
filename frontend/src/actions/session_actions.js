import * as APIUtil from '../util/session_api_util';


import jwt_decode from 'jwt-decode';
// var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECIEVE_DATA = "RECIEVE_DATA";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});


export const receiveData = data => ({
    type: RECIEVE_DATA,
    data
})

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});
  
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});
// export const getFeed = () => dispatch => {
    
    
//        return APIUtil.getFeed().then(what => {
//            debugger
//            return(
//                "oh"
//            )
//        })
    
        
// }
export const signup = user => dispatch => (
    APIUtil.signup(user).then(() => (
        dispatch(receiveUserSignIn())
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const login = user => dispatch => (
    APIUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
)

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');


var requestSettings = {
    method: 'GET',
    url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
    encoding: null,
    headers: {
        'x-api-key': 'Y6uzeeKW5s58j2e1NxdDMDBKAyT1o4N7rltQeqW6'
    }

};


export const getFeed = async function (dispatch) {
    let x = {}
    
    const response = await request(requestSettings, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
            feed.entity.forEach(function (entity) {
                x.push(entity)
                if (entity.trip_update) {
                    console.log(entity.trip_update);
                }
            });
            
            x = { train: feed.entity }
            debugger
            return { train: feed.entity }
        }
    });
    
    dispatch(receiveData(response))

}
