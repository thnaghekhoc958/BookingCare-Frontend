import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";
import { withRouter } from "react-router";

import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter/HomeFooter";
import DoctorScheduleStyle from "../css/DoctorScheduleStyle.scss";
import DatePickerComponent from "../../System/Doctor/DateTime/SingleDateSelector";
import Booking from "./Booking/Booking";

// fireBase
import * as action from "../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { Label } from "reactstrap";
import { toast } from "react-toastify";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      allDays: [],
      date: null,
      doctorId: "",
      //id
      TimeWork: "",
      //schedule
      arrSchedule: [],

      ismodal: false,
      dataScheduleTimeModal: {},
    };
  }

  openCalendar = () => {
    if (this.calendarRef.current) {
      this.calendarRef.current.flatpickr.open();
    }
  };
  async componentDidMount() {
    // console.log('calendarRef:', this.calendarRef);
    this.props.changeLanguageAppRedux();
    // this.setArrDays();
    //
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let dateLanguage = this.setArrDays();
      this.setState({
        allDays: dateLanguage,
      });
    }
    if (prevProps.ScheduleDoctors !== this.props.ScheduleDoctors) {
      this.setState({
        arrSchedule: this.props.ScheduleDoctors,
      });
    }
    if (
      prevProps.doctorId !== this.props.doctorId
      // prevState.allDays !== this.state.allDays
    ) {
      let dateStart = this.setArrDays();
      let a = dateStart[0].value;
      this.OnChangeInput(a);
      console.log("this.props.doctorId: ", this.props.doctorId);
      console.log("this.dateStart: ", dateStart);
    }
  }

  setArrDays = () => {
    let { language } = this.props;
    let { allDays, TimeWork } = this.state;
    // console.log(moment(new Date()).format("dddd - DD/MM"));
    // console.log(moment(new Date()).locale("en").format("dddd - DD/MM"));
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        moment.locale("vi");
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        moment.locale("en");
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
    // this.setState({
    //   allDays: arrDate,
    // });
  };

  OnChangeInput = (value) => {
    this.setState(
      {
        TimeWork: value,
      },
      () => {
        console.log("TimeWork: ", this.state.TimeWork);
        this.props.getScheduleOfDoctor(
          this.props.doctorId,
          this.state.TimeWork
        );
      }
    );
  };
  //   OnChangeInput = (event, id) => {
  //     let copyState = { ...this.state };
  //     copyState[id] = event.target.value;
  //     this.setState(
  //       {
  //         ...copyState,
  //       }, () => {    this.props.getScheduleOfDoctor(this.props.doctorId, this.state.TimeWork);
  //       }
  //     );
  //     // this.props.getScheduleOfDoctor(this.props.doctorId, this.state.TimeWork);
  //   };

  // isopenModalToggle = (Time) => {
  //   this.setState({
  //     ismodal: !this.state.ismodal,
  //     dataScheduleTimeModal: Time

  //   });
  // };

  HandleClickShceduleTime =(data) => {
    //doctorId
    console.log('data',data)
    let dataURL = encodeURIComponent(JSON.stringify(data));
    //${data.doctorId}
    this.props.history.push(`/schedule-a-medical-appointment/${dataURL}`)
  }


  render() {
    let { language, ScheduleDoctors } = this.props;
    let { allDays, arrSchedule, date } = this.state;

    // console.log(this.state.TimeWork)
    console.log("ScheduleDoctors: ", ScheduleDoctors);
    return (
      <React.Fragment>
        <div className="doctor-schedule-container">
          <div className="col-12 infor-shedule">
            <div className="all-schedule">
              <i
                className="fas fa-calendar-alt calendar-schedule"
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#007bff",
                }}
                onClick={() => this.openCalendar()}
              >
                {/* <Flatpickr
                ref={this.calendarRef}
                  data-enable-time
                  value={date}
                  style={{ display: 'none' }}
                  onChange={([date]) => {
                    this.setState({ date });
                  }}
                /> */}
              </i>
              <select
                className="form-select"
                onChange={(event) => this.OnChangeInput(event.target.value)}
              >
                {allDays &&
                  allDays.length > 0 &&
                  allDays.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="all-available-time">
              <div className="text-cenlendar">
                <i className="fa-solid fa-calendar-check fa-fw">
                  <span>LỊCH KHÁM</span>
                </i>
              </div>
            </div>
            <div className="container-fluid">
              {arrSchedule && arrSchedule.length > 0 ? (
                arrSchedule.map((item, index) => {
                  let TimeVi = `${item.timeTypeData.ValueVi}`;
                  let TimeEn = `${item.timeTypeData.valueEn}`;
                  return (
                    <button
                      key={index}
                      className="btn btn-outline-warning View-time"
                      // onClick={() => this.isopenModalToggle(item)}
                      onClick={() => this.HandleClickShceduleTime(item)}
                    >
                      {/* <Booking
                        toggle={this.isopenModalToggle}
                        dataScheduleTimeModal = {this.state.dataScheduleTimeModal}
                        ismodal={this.state.ismodal}
                        className="container"
                      /> */}
                      {language === LANGUAGES.VI ? TimeVi : TimeEn}
                    </button>
                  );
                })
              ) : (
                <span>
                  Không Tồn Tại Lịch Khám Bệnh Nào cả! Voi Lòng chọn ngày Khác!
                </span>
              )}
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
    ScheduleDoctors: state.admin.scheduleTimeofDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getScheduleOfDoctor: (doctorId, date) =>
      dispatch(action.getScheduleOfDoctor(doctorId, date)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
