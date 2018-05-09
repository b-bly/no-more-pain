export default function (state = {}, action) {
    switch (action.type) {
        case 'POST_NEW_USER':
            return action.payload;
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return action.payload;
        case 'GET_USER':
            return action.payload;
        default:
            return state;
    }
}