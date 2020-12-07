import {

    RECIEVE_DATA
} from '../actions/session_actions';

const initialState = {
    
};

export default function (state = initialState, action) {
    
    switch (action.type) {
        case RECIEVE_DATA:
            
                Object.assign({}, state, action.data.data)
                break;
        default:
            return state;
    }
}