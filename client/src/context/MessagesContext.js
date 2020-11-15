// 1. createContext;
// 2. Provider.createContext
// 3. UseContext;

import React, { createContext, useReducer } from 'react';

const initialState = {
    LastMessage: {}
}
export const ActionTypes = {
    ADD_LASTMESSAGE: "ADD_LASTMESSAGE"
}

const MessageReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LASTMESSAGE:
            return {
                ...state,
                LastMessage: action.payload
            }
        default:
            return state;
    }
}


export const MessageContext = createContext();
export const MessageContextProvider = (props) => {
    const [state, dispatch] = useReducer(MessageReducer, initialState);

    return (
        <MessageContext.Provider value={[state, dispatch]}>
            {props.children}
        </MessageContext.Provider>
    )
}




