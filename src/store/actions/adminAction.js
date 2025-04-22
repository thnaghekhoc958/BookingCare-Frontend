import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  CreateNewUserFromService,
  getAllUsers,
  getDeleteUser,
  UpdateDataRedux,
  getTopDoctorHomeService,
  getAllDoctorService,
  SaveDetailDoctor,
  handleFindDoctorService,
  getDetailDoctor,
  saveBulkScheduleDoctor,
  getSchedulebydate,
  getAddInfor,
  getDoctorAppiontment
  
} from "../../services/userService";
import { dateFormat } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

///Gender
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFAILDED = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});
///position
export const fetchPositionSuccess = (PositionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: PositionData,
});
export const fetchPositionFAILDED = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});
///RoleId
export const fetchRoleIdSuccess = (RoleId) => ({
  type: actionTypes.FETCH_ROLEID_SUCCESS,
  data: RoleId,
});
export const fetchRoleIdFAILDED = (RoleId) => ({
  type: actionTypes.FETCH_ROLEID_FAILDED,
});

// start -> doing -> end
//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("GENDER");
      if (res && res.errcode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFAILDED());
      }
    } catch (error) {
      dispatch(fetchGenderFAILDED());

      console.log(error);
    }
  };
};
//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("POSITION");
      if (res && res.errcode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFAILDED());
      }
    } catch (error) {
      dispatch(fetchPositionFAILDED());
      console.log(error);
    }
  };
};

//RoleId
export const fetchRoleIdStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("ROLE");
      if (res && res.errcode === 0) {
        dispatch(fetchRoleIdSuccess(res.data));
      } else {
        dispatch(fetchRoleIdFAILDED());
      }
    } catch (error) {
      dispatch(fetchRoleIdFAILDED());
      console.log(error);
    }
  };
};

// user_save
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let resetState = [];
      // console.log("check data adminaction", data);
      let res = await CreateNewUserFromService(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        toast.success("Create User Success!");
        dispatch(fetchTopDoctor());
        dispatch(saveUserSuccess(resetState));
        // c1 goi lai api
        // dispatch(FetchAllUsers());
        // c2: them nguoi dung vua tao vao thang table luon(lưu ý chỉ dùng được khi và chỉ khi hàm trả cả data CreateNewUserFromService vef)
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        dispatch(saveUserFailded());
      }
    } catch (error) {
      dispatch(saveUserFailded());
      console.log(error);
    }
  };
};

// user_save
export const saveUserSuccess = (data) => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  data: data,
});
export const saveUserFailded = () => ({
  type: actionTypes.SAVE_USER_FAILDED,
});

//view-edit-delete-in table
export const FetchAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        //console.log("res.data is : ", res.users);
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        dispatch(fetchAllUsersFAILDED());
      }
    } catch (error) {
      dispatch(saveUserFailded());
      console.log(error);
    }
  };
};

export const fetchAllUsersSuccess = (dataUser) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  data: dataUser,
});
export const fetchAllUsersFAILDED = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

// FETCH_DELETE_USER_SUCCESS: "FETCH_DELETE_USER_SUCCESS",
// FETCH_DELETE_USER_FAILDED: "FETCH_DELETE_USER_FAILDED",

export const FetchDeleteUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDeleteUser(data);
      if (res && res.errcode === 0) {
        toast.success("Delete User Success!");
        // dispatch(fetchDeleteUserSuccess(res.users));
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        dispatch(fetchDeleteUserFAILDED());
      }
    } catch (error) {
      dispatch(fetchDeleteUserFAILDED());
      console.log(error);
    }
  };
};

export const fetchDeleteUserSuccess = () => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
});
export const fetchDeleteUserFAILDED = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

//UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
//UPDATE_USER_FAILDED: "UPDATE_USER_FAILDED",
//UpdateDataRedux

export const UpdateUserData = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await UpdateDataRedux(data);
      if (res && res.errcode === 0) {
        toast.success("Update User Success!");
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        dispatch(UpdateUserDataFAILDED());
      }
    } catch (error) {
      dispatch(UpdateUserDataFAILDED());
      console.log(error);
    }
  };
};

export const UpdateUserDataSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});
export const UpdateUserDataFAILDED = () => ({
  type: actionTypes.UPDATE_USER_FAILDED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.response.errcode === 0) {
        console.log(res.response.data);
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.response.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.doctors.errcode === 0) {
        // toast.success(" User Success!");
        console.log(res);
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: res.doctors.data,
        });
      } else {
        // toast.error("Update User fail !");

        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      // toast.error("Update User fail !");
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const SaveObjectDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      let res = await SaveDetailDoctor(data);
      if (res && res.errcode === 0) {
        console.log(res.data);
        toast.success("save information success!!!");
        dispatch(handleFindDoctor());
        dispatch({
          type: actionTypes.SAVE_OBJECT_DOCTOR_SUCCESS,
          type: actionTypes.HANDLE_FIND_DOCTOR_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        toast.error(res.errmessage);
        dispatch({
          type: actionTypes.SAVE_OBJECT_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      toast.error("error from Server!!!");
      dispatch({
        type: actionTypes.SAVE_OBJECT_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const handleFindDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleFindDoctorService();
      if (res && res.errcode === 0) {
        console.log(res.doctors);
        dispatch({
          type: actionTypes.HANDLE_FIND_DOCTOR_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.HANDLE_FIND_DOCTOR_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.HANDLE_FIND_DOCTOR_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const fectchDetialInforDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log(id);
      let res = await getDetailDoctor(id);
      if (res && res.errcode === 0) {
        console.log(res.data);
        dispatch({
          type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const fectchAllscheduleTIMEDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errcode === 0) {
        console.log(res.data);
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const postScheduleDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log("data in AdminAction is : ", data);
      let res = await saveBulkScheduleDoctor(data);
      if (res && res.errcode === 0) {
        toast.success("Save Schedule Success!!!");
        dispatch({
          type: actionTypes.POST_SCHEDULE_TIME_DOCTOR_SUCCESS,
        });
      } else {
        toast.error(res.errmessage);
        dispatch({
          type: actionTypes.POST_SCHEDULE_TIME_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      toast.error("error from Server");
      dispatch({
        type: actionTypes.POST_SCHEDULE_TIME_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

export const getScheduleOfDoctor = (data, date) => {
  return async (dispatch, getState) => {
    try {
      console.log("data in AdminAction is : ", date);
      let res = await getSchedulebydate(data, date);
      if (res && res.errcode === 0) {
        dispatch({
          type: actionTypes.GET_SCHEDULE_TIME_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_SCHEDULE_TIME_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_SCHEDULE_TIME_DOCTOR_FAILDED,
      });
      console.log(error);
    }
  };
};

//getRequiredDoctorInfor
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");

      if (
        resPrice &&
        resPrice.errcode === 0 &&
        resPayment &&
        resPayment.errcode === 0 &&
        resProvince &&
        resProvince.errcode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFAILDED());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInforFAILDED());
      console.log(error);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  dataAllInfor: data,
});
export const fetchRequiredDoctorInforFAILDED = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED,
});

//getBesideInfor
export const getBesideInfor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAddInfor(id);
      if (res && res.data && res.errcode === 0 ) {
        console.log('res: ', res.data)
        dispatch({
          type: actionTypes.FETCH_BESIDE_INFOR_INFOR_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({type: actionTypes.FETCH_BESIDE_INFOR_INFOR_FAILDED});
      }
    } catch (error) {
      dispatch({type: actionTypes.FETCH_BESIDE_INFOR_INFOR_FAILDED});
      console.log(error);
    }
  };
};

//  GET_DOCTOR_INFOR_APPIONTMENT_SUCCESS: "GET_DOCTOR_INFOR_APPIONTMENT_SUCCESS",
//GET_DOCTOR_INFOR_APPIONTMENT_FAILDED: "GET_DOCTOR_INFOR_APPIONTMENT_FAILDED",

export const handleGetAppiontment = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log("id",id)
      let res = await getDoctorAppiontment(id);
      if (res && res.data && res.errcode === 0 ) {
        console.log('res: ', res.data)
        dispatch({
          type: actionTypes.GET_DOCTOR_INFOR_APPIONTMENT_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({type: actionTypes.GET_DOCTOR_INFOR_APPIONTMENT_FAILDED});
      }
    } catch (error) {
      dispatch({type: actionTypes.GET_DOCTOR_INFOR_APPIONTMENT_FAILDED});
      console.log(error);
    }
  };
};



