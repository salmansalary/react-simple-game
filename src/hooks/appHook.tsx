import { createContext, useReducer, useContext, Dispatch, Reducer} from 'react'

const hanlder_addNewScore = (state, action) => {
    const data = {
        ...action.payload,
        name: state.currentPlayer
    };
    let records = [...state.records,data];
    return {
        ...state,
        records
    }
}

const handler_setCurrentPlayer = (state, action) => {
    const data = action.payload;
    return {
        ...state,
        currentPlayer : data
    }
}

const actionHandler = {
    'ADD_SCORE' : hanlder_addNewScore,
    'SET_CURRENT_PLAYER' : handler_setCurrentPlayer
}


type ScoreRecord = {
    time: number,
    name: String,
    score: number
}

type State = {
    records: ScoreRecord[],
    currentPlayer: String
}

type Action = {
    type: string,
    payload: any
}

interface InitContextProps {
    store: State;
    dispatch: Dispatch<Action>;
}

const initialState = {
    records : [],
    currentPlayer : ''
} as State;

const appReducer : Reducer<State, Action> = (state, action) => {
    const handler = actionHandler[action.type];
    return handler ? handler(state, action) : state;
}

const AppContext = createContext({} as InitContextProps)

export const AppProvider = props => {

    const [ store, dispatch ] = useReducer(appReducer, initialState)

    return <AppContext.Provider value={{ store, dispatch }}>
                {props.children}
            </AppContext.Provider>
}

export const useStore = () => useContext(AppContext)
