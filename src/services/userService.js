import { template } from "lodash";
import axios from "../axios";
const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email: email, password: password });
};

const verifyTokenCaptcha = (token) => {
  console.log(token)
  return axios.post(`/api/checkin-captcha-valida?token=${token}`);
}

// template string
// {id : inputId}
const getAllUsers = (inputId) => {
  console.log("inputId: ", inputId);
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const CreateNewUserFromService = (data) => {
  return axios.post("/api/create-new-users", data);
};
const getDeleteUser = (id) => {
  console.log("/api/delete-all-data : ", id);
  return axios.delete("/api/delete-all-data", { data: { id: id } });
};

const getEditData = (data) => {
  return axios.put("/api/edit-all-data", data);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const UpdateDataRedux = (data) => {
  return axios.put("/api/update-data-for-user/re-dux", data);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctor`);
};

const handleFindDoctorService = () => {
  return axios.get(`/api/get-find-doctors-follows-users`);
};

const SaveDetailDoctor = (data) => {
  return axios.post('/api/save-information-of-doctor',data)
}

const getDetailDoctor = (id) => {
  return axios.get(`/api/get-detail-by-id?id=${id}`)
}

const getAddInfor = (id) => {
  
  return axios.get(`/api/get-besides-infor-follow-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-cretate-schedule',data)
}

const getSchedulebydate = (doctorId,dateSchedule) => {
  console.log('dateSchedule: ',dateSchedule)
  return axios.get(`/api/get-shedule-doctor-by-date?doctorId=${doctorId}&dateSchedule=${dateSchedule}`)
}

const getDoctorAppiontment = (id) => {
  console.log(id)
  return axios.get(`/api/information-doctor-schedule-appiontment?id=${id}`)
}

const postPaitentBookAppiontMent = (data) => {
  return axios.post('/api/save-Schedule-bookingCare-for-appiontment',data)
}

const VerifyBookAppiontMent = (data) => {
  return axios.post('/api/verify-Schedule-bookingCare-for-appiontment',data)
}

const getInforSearchBox = (value) => {
  return axios.get(`/api/search-item-data?value=${value}`)
}

const handleSaveSpecialty = (data) => {
  console.log('data: ',data)
  return axios.post('/api/create-newcontent-specialty',data)
}

const handleSaveClinic = (data) => {
  console.log('data: ',data)
  return axios.post('/api/create-newcontent-Clinic',data)
}

export {
  handleLoginAPI,
  verifyTokenCaptcha,
  handleSaveClinic,
  getAllUsers,
  CreateNewUserFromService,
  getDeleteUser,
  getEditData,
  getAllCodeService,
  UpdateDataRedux,
  getTopDoctorHomeService,
  getAllDoctorService,
  SaveDetailDoctor,
  handleFindDoctorService,
  getDetailDoctor,
  saveBulkScheduleDoctor,
  getSchedulebydate,
  getAddInfor,
  getDoctorAppiontment,
  postPaitentBookAppiontMent,
  VerifyBookAppiontMent,
  getInforSearchBox,
  handleSaveSpecialty,
};
