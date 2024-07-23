
import { apiMiddleware } from "./API"
import {loginMiddleware} from "./Login"
import { registerMiddleware } from "./Register"
import { userMiddleware } from "./User"
export const MiddleWare=[
    ...apiMiddleware,
    ...loginMiddleware,
    ...registerMiddleware,
    ...userMiddleware
]