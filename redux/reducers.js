export const locations = (state = [], action) => {
    //alert('action' , action.type);
    switch (action.type){
        case 'ADD_LOCATION':
            alert('action '+ action.type)
            return state.concat(action.location);
        default:
            return state;
    }
}