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
    VACCINATION_START = 'vaccination/start',
    VACCINATION_LIST_SUCCESS = 'vaccination/list/success',
    VACCINATION_ADD_SUCCESS = 'vaccination/add/success',
    VACCINATION_ERROR = 'vaccination/error',
  };
  
  export type Actions = {
    VACCINATION_START: { type: ActionsTypes.VACCINATION_START, payload: any },
    VACCINATION_LIST_SUCCESS: { type: ActionsTypes.VACCINATION_LIST_SUCCESS, payload: any }
    VACCINATION_ERROR: { type: ActionsTypes.VACCINATION_ERROR, payload: Error }
    VACCINATION_ADD_SUCCESS: { type: ActionsTypes.VACCINATION_ADD_SUCCESS, payload: any }
  }
  
  //Initial auth reducer state
  const initialState = Map<'list' | 'loading' | 'error' | any>({
    list: [],
    loading: false,
    error: false
  });
  
  type State = Map<string, any>
  
  export const vaccinationReducer = reducerSelector(initialState, {
    [ActionsTypes.VACCINATION_START](state: State, a:Actions['VACCINATION_START']){
      state = state.set('loading', true);
      return state
    },
    [ActionsTypes.VACCINATION_LIST_SUCCESS](state: State, a:Actions['VACCINATION_LIST_SUCCESS']){
      state = state.set('list', a.payload);
      state = state.set('loading', false);
      return state
    },
    [ActionsTypes.VACCINATION_ERROR](state: State, a:Actions['VACCINATION_ERROR']){
      state = state.set('error', a.payload);
      state = state.set('loading', false);
      return state
    },
    [ActionsTypes.VACCINATION_ADD_SUCCESS](state: State, a:Actions['VACCINATION_ADD_SUCCESS']){
      
      state = state.set('loading', false);
      return state;
    }
  })
  
  //Selectors
  
  const mainSelector = (cb: any) => {
    return (state: any) => cb(state.vaccination); 
  }
  
  export const getVaccinations = mainSelector((state: State) => {
    const vaccinations = state.get('list', []);
    return {
        vaccinations
    }
  })
  
  //Action Creator;
  export const vaccinationList = (data: any) => ({type: ActionsTypes.VACCINATION_LIST_SUCCESS, payload: data}) 
  
  
  export const listAllVaccinations = async(): Promise<any> => {
    return async (dispatch: any, getState: any) => {
        try {
          const { data } = await axios.get("/vaccination");
          dispatch(vaccinationList(data))
          return data;
        }catch(err) {
        dispatch({type: ActionsTypes.VACCINATION_ERROR, payload: 'Não foi possível carregar a lista de vacinação'})
          console.log(err)
        }
    }
  }

  export const addVaccination = async(param: any): Promise<any> => {
    return async (dispatch: any, getState: any) => {
        try {
          const { data } = await axios.post("/vaccination");
          
          return data;
        }catch(err) {
        dispatch({type: ActionsTypes.VACCINATION_ERROR, payload: 'Não foi possível cadastrar vacinação'})
          console.log(err)
        }
    }
  }