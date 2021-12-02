import * as Cookie from '../../util/cookie'
import { jwtPayload } from '../../util/jwt';
import reducerSelector from './reducer';
import { Map, fromJS } from 'immutable';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';


export enum ActionsTypes {
    VACCINE_START = 'vaccine/start',
    VACCINE_LIST_SUCCESS = 'vaccine/list/success',
    VACCINE_ADD_SUCCESS = 'vaccine/add/success',
    VACCINE_ERROR = 'vaccine/error',
};

export type Actions = {
    VACCINE_START: { type: ActionsTypes.VACCINE_START, payload: any },
    VACCINE_LIST_SUCCESS: { type: ActionsTypes.VACCINE_LIST_SUCCESS, payload: any }
    VACCINE_ERROR: { type: ActionsTypes.VACCINE_ERROR, payload: Error }
    VACCINE_ADD_SUCCESS: { type: ActionsTypes.VACCINE_ADD_SUCCESS, payload: any }
}

//Initial auth reducer state
const initialState = Map<'list' | 'loading' | 'error' | any>({
    list: [],
    loading: false,
    error: false
});

type State = Map<string, any>

export const vaccineReducer = reducerSelector(initialState, {
    [ActionsTypes.VACCINE_START](state: State, a: Actions['VACCINE_START']) {
        state = state.set('loading', true);
        return state
    },
    [ActionsTypes.VACCINE_LIST_SUCCESS](state: State, a: Actions['VACCINE_LIST_SUCCESS']) {
        state = state.set('list', a.payload);
        state = state.set('loading', false);
        return state
    },
    [ActionsTypes.VACCINE_ERROR](state: State, a: Actions['VACCINE_ERROR']) {
        state = state.set('error', a.payload);
        state = state.set('loading', false);
        return state
    },
    [ActionsTypes.VACCINE_ADD_SUCCESS](state: State, a: Actions['VACCINE_ADD_SUCCESS']) {

        state = state.set('loading', false);
        return state;
    }
})

//Selectors

const mainSelector = (cb: any) => {
    return (state: any) => cb(state.vaccine);
}

export const getVaccines = mainSelector((state: State) => {
    const vaccines = state.get('list', []);
    return {
        vaccines
    }
})

//Action Creator;
export const vaccinationList = (data: any) => ({ type: ActionsTypes.VACCINE_LIST_SUCCESS, payload: data })


export const listVaccines = async (): Promise<any> => {
    return async (dispatch: any, getState: any) => {
        try {
            const { data } = await axios.get("/vaccine");
            dispatch(vaccinationList(data))
            return data;
        } catch (err) {
            dispatch({ type: ActionsTypes.VACCINE_ERROR, payload: 'Não foi possível carregar a lista de vacinas' })
            console.log(err)
        }
    }
}