import {
    HOME_INIT_HOME
} from '../constants/actionTypes'

const initialState = {
    title: "",
    content: ""
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case HOME_INIT_HOME:
            var newState = Object.assign({}, state, {
                ...action.payload
            })
            return newState
        default:
            return state
    }
}