import { AnyAction } from "@reduxjs/toolkit";

interface StringState{
    value: string;
};

const initialState: StringState = {
    value: 'Initial String',
  };
  


const stringReducer = (state:StringState = initialState, action: AnyAction) => {
    switch(action.type){
        case 'UPDATE_STRING':
            return{
                ...state,
                value: action.payload,

            };
            default:
                return state;
    }

};

export default stringReducer;