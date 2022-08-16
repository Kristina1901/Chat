import {LOGIN_ROUTE} from './utils/consts'
import {CHAT_ROUTE} from './utils/consts'
import LOGIN from './components/Login/Login'
import CHAT from './components/Chat/Chat'
export const publicRoutes =[
    {
        path: LOGIN_ROUTE,
        Component: LOGIN
    }
]

export const privateRoutes =[
    {
        path: CHAT_ROUTE,
        Component: CHAT
    }
]