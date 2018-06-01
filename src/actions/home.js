import {
    HOME_INIT_HOME
} from '../constants/actionTypes'

export const initHome = () => {
    return {
        type: HOME_INIT_HOME,
        payload: {
            title: "Welcome to new template",
            content: "The template base on react 16.x, react-router 4.x"
        }
    }
}