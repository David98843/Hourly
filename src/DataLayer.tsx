import {
    useContext,
    createContext,
    useReducer
} from 'react'

const DataLayerContext = createContext({})

export const DataLayer = ({initialState, reducer, children}) => { 
    return(
        <DataLayerContext.Provider value = {useReducer(reducer, initialState)}>
            {children}
        </DataLayerContext.Provider>
    )
    
}

export const useDataLayerValue = () => useContext(DataLayerContext)