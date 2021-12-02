export default function reducerSelector(initialState: any, reducers: any) {
    return (state = initialState, action: any) => {
        const reducer = reducers[action.type]

        if(reducer) {
            return reducer(state, action);
        }

        return state;
    }
}