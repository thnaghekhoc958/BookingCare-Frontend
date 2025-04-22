import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});


export const changeLanguageApp = (language) => {
    // Kiểm tra nếu language có giá trị và hợp lệ
    if (language) {
        return {
            type: actionTypes.CHANGE_LANGUAGE,
            language: language
        };
    } else {
        console.warn("Invalid language value provided. No action dispatched.");
        // Không dispatch action nếu language không hợp lệ
        return {
            type: actionTypes.CHANGE_LANGUAGE,
            language: 'vi', // Giá trị mặc định, bạn có thể thay đổi
        };
    }
};

//STATUS_VERIFY
//isStatusVerify
export const isStatusVerify = (status) => {
    // Kiểm tra nếu language có giá trị và hợp lệ
    if (status) {
        return {
            type: actionTypes.STATUS_VERIFY,
            status: status
        };
    }
};