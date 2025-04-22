export const path = {
    HOME: '/',
    HOMEPAGE:'/Home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    SCHEDULE_APPOINTMENT: '/schedule-a-medical-appointment/:dataURL',
    VERIFY_EMAIL_BOOKING: '/verify-booking'
    // VERIFY_EMAIL_BOOKING: '/verify-booking/?:token&:doctorId'
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};
 
export const CRUD_ACTIONS = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    CREATE: "CREATE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}

export const USE_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3'
}

export const DATE_AND_TIME = {
    RANGE_TIME_START: 'RANGE_TIME_START',
    RANGE_TIME_END: 'RANGE_TIME_END',
    ACTION_PRINT : 'ACTION_PRINT',

    DATE_TIME: 'DATE_TIME',
    DATE_BIRTHDAY: 'DATE_BIRTHDAY'
}