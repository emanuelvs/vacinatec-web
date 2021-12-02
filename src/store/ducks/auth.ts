import * as Cookie from '../../util/cookie'
import { jwtPayload } from '../../util/jwt';
import reducerSelector from './reducer';
import { Map, fromJS } from 'immutable';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

export type Auth = {
    jwt: string
  }
  
  export enum ActionsTypes {
    AUTH_START = 'auth/start',
    AUTH_SUCCESS = 'auth/success',
    AUTH_ERROR = 'auth/error',
    AUTH_UNAUTHORIZED = 'auth/unauthorized',
  };
  
  export type Actions = {
    AUTH_START: { type: ActionsTypes.AUTH_START, payload: any },
    AUTH_SUCCESS: { type: ActionsTypes.AUTH_SUCCESS, payload: Auth }
    AUTH_ERROR: { type: ActionsTypes.AUTH_ERROR, payload: Error }
    AUTH_UNAUTHORIZED: { type: ActionsTypes.AUTH_UNAUTHORIZED, payload: Error }
  }
  
  export enum cookies {
    TOKENSWAP = 'TOKENSWAP',
    TOKEN = 'manager_token'
  }
  const authCookie = Cookie.get(cookies.TOKEN);
  
  //Initial auth reducer state
  const initialState = Map<'token' | 'loading' | 'error' | any>({
    token: {
      raw: authCookie,
      payload: jwtPayload(authCookie),
    },
    loading: false,
    error: false
  });
  
  type State = Map<string, any>
  
  export const authReducer = reducerSelector(initialState, {
    [ActionsTypes.AUTH_START](state: State, a:Actions['AUTH_START']){
      state = state.set('loading', true);
      return state
    },
    [ActionsTypes.AUTH_SUCCESS](state: State, a:Actions['AUTH_SUCCESS']){
      state = state.setIn(['token', 'raw'], a.payload.jwt)
      state = state.setIn(['token', 'payload'], fromJS(jwtPayload(a.payload.jwt)))
      state = state.set('loading', false);
    },
    [ActionsTypes.AUTH_ERROR](state: State, a:Actions['AUTH_ERROR']){
      state = state.set('error', a.payload);
      state = state.set('loading', false);
    },
    [ActionsTypes.AUTH_UNAUTHORIZED](state: State, a:Actions['AUTH_UNAUTHORIZED']){
      state = state.set('error', a.payload);
      state = state.setIn(['token', 'raw'], '')
      state = state.setIn(['token', 'payload'], fromJS({}))
      state = state.set('loading', false);
    }
  })
  
  //Selectors
  
  const mainSelector = (cb: any) => {
    return (state: any) => cb(state.auth); 
  }
  
  export const isAuthenticated = mainSelector((state: State) => {
    const token = state.getIn(['token', 'raw'], '');
    return {
      token
    }
  })
  
  //Action Creator;
  export const authentication = (credentials: any) => ({type: ActionsTypes.AUTH_START, payload: credentials}) 
  export const registration = (form: any) => ({type: ActionsTypes.AUTH_START, payload: form}) 
  export const authenticated = (jwt: string) => ({type: ActionsTypes.AUTH_SUCCESS, payload: {jwt}})
  
  const authenticate = async (param: any): Promise<any> => {
    
    return await axios.post("/auth", param.payload);
  }
  const createUser = async (param: any): Promise<any> => {
    
    return await axios.post("/person", param.payload);
  }
  //Workers 
  

  function* authStart(param: any): Generator{
    try {
      const { data }: any = yield call(authenticate, param);
      
      console.log("LKSDNFLASKD", data.jwtToken);
      yield put(authenticated(data.jwtToken))
    } catch (error) {
        console.log(error);
    }
  }
  function* createUserStart(param: any): Generator{
    try {
      const { data }: any = yield call(createUser, param);
      console.log(data)
      yield data
    } catch (error) {
        console.log(error);
    }
  }

  //Watchers
  
  export function* auth(){
    yield all([
      takeEvery(ActionsTypes.AUTH_START, authStart)
    ])
  }