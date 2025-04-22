import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,
    statusVerify: "",
}

const initialState = {
    started: true,
    language: 'en',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGE_LANGUAGE: 
        console.log('hoidanit',state)
            return {
                ...state,
                language: action.language,
            }  
            //statusVerify  
            case actionTypes.STATUS_VERIFY: 
            console.log('hoidanit',state)
                return {
                    ...state,
                    statusVerify: action.status,
                } 
        default:
            return state;
    }
}

export default appReducer;