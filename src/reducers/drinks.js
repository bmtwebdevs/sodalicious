const drinks = (state = new Map(), action) => {
    let nextState = new Map(state);
    
    switch(action.type)
    {
        case : 'ADD_DRINK'
            //Do something to next state here
            break;
        default: return state;
    }
    
    return nextState;
}

export default drinks;