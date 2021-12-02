import { all } from 'redux-saga/effects';
import { auth } from '../ducks/auth';

export default function* rootSaga(){
    yield all([
        auth()
    ])
}