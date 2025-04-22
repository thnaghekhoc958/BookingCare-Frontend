import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import HomeHeader from "../../../HomePage/HomeHeader";
import ScheduleMedicalAppointmentStyle from "./Style/ScheduleMedicalAppointmentStyle.scss";
import { FormattedMessage } from "react-intl";
import DatePickerComponent from "../../../System/Doctor/DateTime/SingleDateSelector";
import { DATE_AND_TIME } from "../../../../utils";
import { toast } from "react-toastify";
// fireBase
import * as action from "../../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../../utils";
import { changeLanguageApp } from "../../../../store/actions";
import { Label } from "reactstrap";
import { isNullishCoalesce } from "typescript";
import { postPaitentBookAppiontMent } from "../../../../services/userService";
class ScheduleMedicalAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataScheduleTimeModal: {},
      // isOpenShowSticky: false,
      ///
      InforDoctor: {},
      ArrDetailDoctor: {},
      arrSchedule: {},
      //
      arrInfordoctor: "",
      arrappointmentDoctor: {},
      ScheduleWorkDoctor: "",
      stateDescripTion: false,
      // storage state save infor booking
      genderArr: [],
      isDayTime: DATE_AND_TIME.DATE_BIRTHDAY,

      email: "",
      name: "",
      phonenumber: "",
      address: "",
      reason: "",
      people: "",
      gender: "",
      BirthDay: "",
      doctorId: "",
      timeType: "",
      doctorPRName: "",
      DateTimeData: "",
    };
  }

  handleTimeChangeInput = (anull, bnull, DayTime) => {
    if (DayTime) {
      this.setState({ BirthDay: DayTime }, () => {
        console.log("BirthDay : ", this.state.BirthDay);
      });
    }
  };

  async componentDidMount() {
    this.props.changeLanguageAppRedux();
    //
    this.GetRangeDateBookingDoctor();
    this.props.getGenderStart();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.GetRangeDateBookingDoctor();
      this.GetNameDoctor();
    }
    if (prevProps.appointmentDoctor !== this.props.appointmentDoctor) {
      this.setState({
        arrappointmentDoctor: this.props.appointmentDoctor,
      },() => {
        this.GetNameDoctor();
      });
      
    }
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderStartArr = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender:
          genderStartArr && genderStartArr.length > 0
            ? genderStartArr[0].keyMap
            : "",
      });
    }
  }

  OnchangeInput = (event, id) => {
    let copyState = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = copyState;
    this.setState(
      {
        ...stateCopy,
      },
      () => {
        console.log("this.state: ", this.state);
      }
    );
  };

  GetRangeDateBookingDoctor = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.dataURL
    ) {
      const decodedData = JSON.parse(
        decodeURIComponent(this.props.match.params.dataURL)
      );
      let doctorId = decodedData.doctorId;
      console.log("dataURL: ", decodedData);
      this.props.HandleGetAppiontment(doctorId);
      // language
      let ToDayDoc = decodedData.dateSchedule;
      let TimeValueEn = decodedData?.timeTypeData?.valueEn || "";
      let TimeValueVi = decodedData?.timeTypeData?.ValueVi || "";
      let TimeChangeLanguages = `${this.props.language === LANGUAGES.VI ? TimeValueVi : TimeValueEn}`
     let ToDayDoc1 = Number(ToDayDoc);
      let locale = this.props.language === LANGUAGES.VI ? "vi" : "en";
      moment.locale(locale); // Đặt ngôn ngữ
      let ScheduleWorkDoctor = moment(ToDayDoc1).format("dddd - DD/MM/YYYY") + `${this.props.language === LANGUAGES.VI ? "  ||  Khoảng Thời Gian " : "  ||  Booking Range Time "}` + TimeChangeLanguages;
      // console.log('ScheduleWorkDoctor',ScheduleWorkDoctor);

      this.setState({
        arrInfordoctor: decodedData,
        ScheduleWorkDoctor: ScheduleWorkDoctor,
        doctorId: doctorId,
        timeType: decodedData.timeType,
        DateTimeData: ToDayDoc,
      });
    }
  }

  GetNameDoctor = () => {
    let {doctorPRName,arrappointmentDoctor} = this.state;
    let {language} = this.props;
    let PositionValueEN = arrappointmentDoctor?.positionData?.valueEN || "";
    let PositionValueVI = arrappointmentDoctor?.positionData?.valueVI || "";

    let RoleIdValueEN = arrappointmentDoctor?.roleData?.valueEN || "";
    let RoleIdValueVI = arrappointmentDoctor?.roleData?.valueVI || "";

    let role = null,
    position = null
    
  // Bỏ qua nếu role là "None"

  if (PositionValueEN === "None") position = "1";
  // Chỉ giữ một "Bác Sĩ" nếu cả position và role là "Bác sĩ"
  if (PositionValueVI === "Bác sĩ" && RoleIdValueVI === "Bác sĩ") role = "1";

  if (role === "1" && position === "1") {
    doctorPRName = `${
      language === LANGUAGES.VI ? RoleIdValueVI : RoleIdValueEN
    } ${arrappointmentDoctor.name}`;
  } else {
    doctorPRName = `${
      language === LANGUAGES.VI ? PositionValueVI : PositionValueEN
    }, ${language === LANGUAGES.VI ? RoleIdValueVI : RoleIdValueEN} ${
      arrappointmentDoctor.name
    }`;
  }

  this.setState({
    doctorPRName
  })

  }

  HandleConFirmBooking = async() => {
    
    let BirthDay = moment(this.state.BirthDay[0]).valueOf();
    // let { arrInfordoctor } = this.state;
    //   let decodedData = arrInfordoctor;
    //   let ToDayDoc = decodedData.dateSchedule;    
//!data.email || !data.doctorId || !data.timeType || !data.dateBooking
    let res = await postPaitentBookAppiontMent({
      doctorPRName: this.state.doctorPRName,
      email: this.state.email,
      name: this.state.name,
      phonenumber: this.state.phonenumber,
      address: this.state.address,
      reason: this.state.reason,
      people: this.state.people,
      BirthDay: BirthDay,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      gender: this.state.gender,
      language: this.props.language,
      dateBooking: this.state.ScheduleWorkDoctor,
      DateTimeData: this.state.DateTimeData,
    })

    if (res && res.errcode === 0) {
      toast.success(res.errmessage)
    }else{
      toast.error(res.errmessage)

    }
  }

  isShowSeeMore = () => {
    this.setState({
      stateDescripTion: !this.state.stateDescripTion,
    });
  };
  render() {
    let {
      dataScheduleTimeModal,
      arrappointmentDoctor,
      arrInfordoctor,
      ScheduleWorkDoctor,
      stateDescripTion,
      // storage
      email,
      name,
      phonenumber,
      address,
      reason,
      people,
      gender,
      doctorPRName,
    } = this.state;
    let { language } = this.props;
    let genders = this.state.genderArr;

    console.log("this.state.arrappointmentDoctor: ", this.props);
    let addressClinic = arrappointmentDoctor?.Doctor_Infor?.addressClinic || "";
    let nameClinic = arrappointmentDoctor?.Doctor_Infor?.nameClinic || "";

    let PriceDataVN = arrappointmentDoctor?.Doctor_Infor?.priceData?.valueVI
      ? arrappointmentDoctor?.Doctor_Infor?.priceData?.valueVI + " VNĐ"
      : "";
    let PriceDataEN = arrappointmentDoctor?.Doctor_Infor?.priceData?.valueEN
      ? arrappointmentDoctor?.Doctor_Infor?.priceData?.valueEN + " USD"
      : "";

    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="container schedule-appointment">

          <div class="appointment-card">
            <div class="doctor-info">
              <img
                src={arrappointmentDoctor.image}
                alt="Doctor"
                class="doctor-image"
              />
              <div class="appointment-details">
                <h3 class="appointment-title">
                  {language === LANGUAGES.EN
                    ? "SCHEDULE AN APPOINTMENT"
                    : "ĐẶT LỊCH KHÁM"}
                </h3>
                {/* <h4 class="doctor-name">{language === LANGUAGES.VI ? PositionValueEN : PositionValueVI}, {language === LANGUAGES.VI ? RoleIdValueEN : RoleIdValueVI},{arrappointmentDoctor.name}</h4> */}
                <h4 className="doctor-name">{doctorPRName}</h4>
                <div class="hospital-info">
                  <span class="icon">🏥</span>
                  <span>{nameClinic}</span>
                </div>
                <p class="hospital-address">
                  <i class="fa-solid fa-location-dot"></i> {addressClinic}
                </p>

                {stateDescripTion === true && (
                  <div className="see-more">
                    {arrappointmentDoctor.MarkDownObject.description}
                  </div>
                )}
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.isShowSeeMore()}
                  style={{ border: "none" }}
                >
                  {language === LANGUAGES.VI ? "xem thêm" : "See More"}{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div class="appointment-time">
              {/* {this.props.showTime === true ? (
                <></>
              ) : ( */}
              <div className="container">
                <div className="time-section">
                  <span className="icon">📅</span>
                  <span className="time-info">
                    {/* {language === LANGUAGES.VI ? TimeValueVi : TimeValueEn} -{" "} */}
                    {ScheduleWorkDoctor}
                  </span>
                </div>

                <div className="price-section">
                  <span className="icon">💲</span>
                  <span className="price-info">
                    {language === LANGUAGES.VI ? PriceDataVN : PriceDataEN}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>
            <h2 className="text-center">
              <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.SCHEDULEANAPPOINTMENT" />
            </h2>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={(event) => this.OnchangeInput(event, "email")}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.fullName" />
              </label>
              <input
                type="text"
                className="form-control"
                id="pwd"
                placeholder="Enter full name"
                name="name"
                onChange={(event) => this.OnchangeInput(event, "name")}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.PhoneNumber" />
              </label>
              <input
                type="number"
                className="form-control"
                id="pwd"
                placeholder="Enter phone number"
                name="phonenumber"
                onChange={(event) => this.OnchangeInput(event, "phonenumber")}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.ContactAddress" />
              </label>
              <input
                type="text"
                className="form-control"
                id="pwd"
                placeholder="Enter địa chỉ liên hệ"
                name="address"
                onChange={(event) => this.OnchangeInput(event, "address")}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.ReasonForExamination" />
              </label>
              <input
                type="text"
                className="form-control"
                id="pwd"
                placeholder="Enter reason"
                name="reason"
                onChange={(event) => this.OnchangeInput(event, "reason")}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.birthday" />
              </label>
              <DatePickerComponent
                isDayTime={this.state.isDayTime}
                handleTimeChangeInput={this.handleTimeChangeInput}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.ForSomeone" />
              </label>
              <input
                type="text"
                className="form-control"
                id="pwd"
                placeholder="Enter for someone"
                name="people"
                onChange={(event) => this.OnchangeInput(event, "people")}
              />
            </div>
            <div className="form-group">
              <label for="pwd">
                <FormattedMessage id="Doctor.content-doctor.medicalAppiontment.Gender" />
              </label>
              <select
                id="inputState"
                className="form-select"
                // value={gender}
                onChange={(event) => {
                  this.OnchangeInput(event, "gender");
                }}
              >
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    // console.log('item is: ',item)
                    // console.log('index is: ',index)

                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="button-group">
              <button type="button" class="btn btn-primary" onClick={() => this.HandleConFirmBooking()}>
                {language === LANGUAGES.VI
                  ? "Đặt Lịch Khám Bệnh"
                  : "Booking an Schedule"}
              </button>
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    //
    thisIsInforDoctor: state.admin.detailDoctor,
    addInforDoctor: state.admin.addInforDoctor,
    ScheduleDoctors: state.admin.scheduleTimeofDoctors,
    //
    appointmentDoctor: state.admin.appointmentDoctor,
    genderRedux: state.admin.genders,
    Status: state.app.statusVerify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    //
    getGenderStart: () => dispatch(action.fetchGenderStart()),

    HandleGetAppiontment: (id) => dispatch(action.handleGetAppiontment(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleMedicalAppointment);
