// TODO: define a type for action

const sidebarReducer = (state = true, action: any) => {
    switch(action.type) {
        case('TOGGLE_SIDE_BAR'):
            return !state;
        default:
            return state;
    }
}

export default sidebarReducer;