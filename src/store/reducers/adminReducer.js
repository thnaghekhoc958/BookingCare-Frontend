import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  isLoadingRoles: false,
  isLoadingPosition: false,
  //
  genders: [],
  roles: [],
  positions: [],
  //
  AllUsers: [],
  reset: [],
  //top-Doctor-of-week
  topDoctors: [],
  //all doctors
  AllDoctors: [],
  // CONTENT DOCTORS
  contentDoctor: [],
  detailDoctor: [],
  // time doctors
  AllScheduleTime: [],
  //schedule work of doctors
  scheduleTimeofDoctors: [],
  // all infor doctor inside
  allResquiredDoctorInfor: [],
  // call infor besides
  addInforDoctor: [],
  // doctor appoinment
  appointmentDoctor: [],

};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;

      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      //  copyState = {...state};
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      copyState.isLoadingGender = false;
      copyState.genders = [];
      return {
        ...state,
      };

    //position
    case actionTypes.FETCH_POSITION_SUCCESS:
      //  copyState = {...state};
      state.positions = action.data;
      state.isLoadingPosition = true;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      copyState.isLoadingPosition = false;
      copyState.positions = [];
      return {
        ...state,
      };

    //RoleId
    case actionTypes.FETCH_ROLEID_SUCCESS:
      //  copyState = {...state};
      state.roles = action.data;
      state.isLoadingRoles = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLEID_FAILDED:
      copyState.isLoadingRoles = false;
      copyState.roles = [];
      return {
        ...state,
      };

    // view-edit-delete-in table
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      let UserState = { ...state };
      UserState.AllUsers = action.data;
      console.log("FETCH_ALL_USERS_SUCCESS:  ", action.data);
      return {
        ...UserState,
      };
    case actionTypes.FETCH_ALL_USERS_FAILDED:
      UserState.AllUsers = [];
      return {
        ...UserState,
      };

    /// change state input user
    case actionTypes.SAVE_USER_SUCCESS:
      let resetState = { ...state };
      resetState.reset = action.data;
      return {
        ...resetState,
      };
    //top-Doctor-of-week
    // topDoctors: [],
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctor;
      console.log("FETCH_TOP_DOCTOR_SUCCESS:  ", state.topDoctors);
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
      state.topDoctors = [];
      return {
        ...state,
      };

    // all doctors
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.AllDoctors = action.data;
      console.log("FETCH_ALL_DOCTOR_SUCCESS:  ", state.AllDoctors);
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.FETCH_ALL_DOCTOR_FAILDED:
      state.AllDoctors = [];
      return {
        ...state,
      };
    // DOCTOR EDIT
    case actionTypes.HANDLE_FIND_DOCTOR_DOCTOR_SUCCESS:
      state.contentDoctor = action.data;
      console.log("HANDLE_FIND_DOCTOR_DOCTOR_SUCCESS:  ", state.AllDoctors);
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.HANDLE_FIND_DOCTOR_DOCTOR_FAILDED:
      state.contentDoctor = [];
      return {
        ...state,
      };
    // Nad
    case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS:
      state.detailDoctor = action.data;
      console.log("FETCH_DETAIL_INFOR_DOCTOR_SUCCESS:  ", state.detailDoctor);
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILDED:
      state.detailDoctor = [];
      return {
        ...state,
      };

    // time of doctor
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_SUCCESS:
      state.AllScheduleTime = action.data;
      console.log(
        "FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_SUCCESS:  ",
        state.detailDoctor
      );
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_FAILDED:
      state.AllScheduleTime = [];
      return {
        ...state,
      };

    // scheduleTimeofDoctors
    case actionTypes.GET_SCHEDULE_TIME_DOCTOR_SUCCESS:
      state.scheduleTimeofDoctors = action.data;
      console.log(
        "GET_SCHEDULE_TIME_DOCTOR_SUCCESS:  ",
        state.scheduleTimeofDoctors
      );
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.GET_SCHEDULE_TIME_DOCTOR_FAILDED:
      state.scheduleTimeofDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allResquiredDoctorInfor = action.dataAllInfor;
      console.log(
        "FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:  ",
        state.allResquiredDoctorInfor
      );
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
      state.allResquiredDoctorInfor = [];
      return {
        ...state,
      };

    // call infor besides
    // addInforDoctor: [],

    case actionTypes.FETCH_BESIDE_INFOR_INFOR_SUCCESS:
      state.addInforDoctor = action.data;
      console.log(
        "FETCH_BESIDE_INFOR_INFOR_SUCCESS:  ",
        state.addInforDoctor
      );
      return {
        ...state,
      };
    // eslint-disable-next-line no-duplicate-case
    case actionTypes.FETCH_BESIDE_INFOR_INFOR_FAILDED:
      state.allResquiredDoctorInfor = [];
      return {
        ...state,
      };

      //appointmentDoctor
      case actionTypes.GET_DOCTOR_INFOR_APPIONTMENT_SUCCESS:
        state.appointmentDoctor = action.data;
        console.log(
          "GET_DOCTOR_INFOR_APPIONTMENT_SUCCESS:  ",
          state.appointmentDoctor
        );
        return {
          ...state,
        };
      // eslint-disable-next-line no-duplicate-case
      case actionTypes.GET_DOCTOR_INFOR_APPIONTMENT_FAILDED:
        state.appointmentDoctor = [];
        return {
          ...state,
        };
  
    default:
      return state;
  }
};

export default adminReducer;
