export default function (state = [], action) {
    console.log('USER reducer, action: ');
    console.log({ ...action.payload });
    switch (action.type) {
        case 'POST_NEW_USER':
            return action.payload;
        case 'LOGIN':
            return action.payload;
        default:
            return state;
    }
}