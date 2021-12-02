import * as Cookie from '../../util/cookie'
import { jwtPayload } from '../../util/jwt';
import reducerSelector from './reducer';
import { Map, fromJS } from 'immutable';
import axios from 'axios';

export type Auth = {
    jwt: string
}

export enum ActionsTypes {
    USER_CREATE_START = 'user/create/start',
    USER_CREATE_SUCCESS = 'user/create/success',
    USER_CREATE_ERROR = 'user/create/error',
};

export type Actions = {
    USER_CREATE_START: { type: ActionsTypes.USER_CREATE_START, payload: any },
    USER_CREATE_SUCCESS: { type: ActionsTypes.USER_CREATE_SUCCESS, payload: Auth }
    USER_CREATE_ERROR: { type: ActionsTypes.USER_CREATE_ERROR, payload: Error }
}

//Initial auth reducer state
const initialState = Map<'user' | 'loading' | 'error' | any>({
    loading: false,
    user: null,
    error: null
});

type State = Map<string, any>

export const userReducer = reducerSelector(initialState, {
    [ActionsTypes.USER_CREATE_START](state: State, a: Actions['USER_CREATE_START']) {
        state = state.set('loading', true);
        return state
    },
    [ActionsTypes.USER_CREATE_SUCCESS](state: State, a: Actions['USER_CREATE_SUCCESS']) {
        state = state.set('loading', false);
        return state
    },
    [ActionsTypes.USER_CREATE_ERROR](state: State, a: Actions['USER_CREATE_ERROR']) {
        state = state.set('error', a.payload);
        state = state.set('loading', false);
        return state;
    },
})

//Selectors

const mainSelector = (cb: any) => {
    return (state: any) => cb(state.user);
}

export const userRegistration = mainSelector((state: State) => {
    const loading = state.get('loading', false);
    const error = state.get('error', null);
    return {
        loading,
        error
    }
})

//Action Creator;
export const registrationFailed = (error: any) => ({ type: ActionsTypes.USER_CREATE_ERROR, payload: error })
export const registration = (data: any) => ({ type: ActionsTypes.USER_CREATE_START, payload: data })
export const registered = (data: any) => ({ type: ActionsTypes.USER_CREATE_SUCCESS, payload: data })

// const authenticate = async (param: any): Promise<any> => {
//     return async (dispatch: any, getState: any) => {
//         dispatch(authentication(param))
//         try {
//             const { data } = await axios.post("/auth", param.payload);
//             dispatch(authenticated(data))
//         } catch (err) {
//             console.log(err)
//         }
//     }
// }

export const createUser = async (param: any): Promise<any> => {
    return async (dispatch: any, getState: any) => {
        dispatch(registration(param))
        try {
            const { data } = await axios.post("/person", param.payload);
            dispatch(registered(data))
        } catch (err) {
            dispatch(registrationFailed(err))
            console.log(err)
        }
    }
}
