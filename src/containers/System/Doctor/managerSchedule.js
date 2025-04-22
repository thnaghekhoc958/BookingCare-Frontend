import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import "moment/locale/fr";

import { getDetailDoctor } from "../../../services/userService";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, DATE_AND_TIME,dateFormat } from "../../../utils";
import * as action from "../../../store/actions";
import manageScheduleStyle from "./Style/manageScheduleStyle.scss";
import { toast } from "react-toastify";
import _, { result } from 'lodash';
// import component
import DatePickerComponent from "./DateTime/SingleDateSelector";
import RangeTimeStart from "./DateTime/RangeTimeStart";
import RangeTimeEnd from "./DateTime/RangeTimeEnd";

class manageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateTime: "",
      selectedTimeMiniut: null,

      rangeTime: "",

      SelectedDoctor: null,
      listDoctors: "",

      isDayTime: DATE_AND_TIME.DATE_TIME,
      isRangeTimeStart: DATE_AND_TIME.RANGE_TIME_START,
      isRangeTimeEnd: DATE_AND_TIME.RANGE_TIME_END,

      ErrorMessage: "",
      TimeRange: [],

      TimeStart: null,
      TimeEnd: null,
      TimeDay: null,

      IsResetTime: "yes",
    };
  }

  // Hàm callback để cập nhật TimeRangeStart từ component con
  handleTimeChangeInput = (startTime, EndTime, DayTime) => {
    // if (startTime && EndTime && DayTime) {
    //   this.setState(
    //     {
    //       TimeStart: startTime,
    //       TimeEnd: EndTime,
    //       TimeDay: DayTime,
    //     },
    //     () => {
    //       console.log("TimeStart : ", this.state.TimeStart);
    //       console.log("TimeEnd : ", this.state.TimeEnd);
    //       console.log("TimeDay : ", this.state.TimeDay);
    //     }
    //   );
    // }

    if (startTime) {
      this.setState({ TimeStart: startTime }, () => {
        console.log("TimeStart : ", this.state.TimeStart);
      });
    } 

    if (EndTime) {
      this.setState({ TimeEnd: EndTime }, () => {
        console.log("TimeEnd : ", this.state.TimeEnd);
      });
    }

    if (DayTime) {
      this.setState({ TimeDay: DayTime }, () => {
        console.log("TimeDay : ", this.state.TimeDay);
      });
    }
  };

  // range-time
  ArrCoupleTimeRange = () => {
    const { TimeStart, TimeEnd } = this.state;
    if (TimeStart && TimeEnd) {
      this.setState((prevState) => ({
        TimeRange: [...prevState.TimeRange, { start: TimeStart, end: TimeEnd }],
        TimeStart: null,
        TimeEnd: null,
      }));
      this.resetTime();
    } else {
      this.setState({
        ErrorMessage : <FormattedMessage id="error.rangTime" />
      });
    }
  };

  resetTime =() => {
    this.setState({
      TimeStart: null,
      TimeEnd: null,
    })
  }

  async componentDidMount() {
    this.props.GetAllDoctors();
    this.props.handleFindDoctor();
    this.props.fetchAllScheduleDoctor();
  }

  // isValidDate = (currentDate) => {
  //   return currentDate.isAfter(yesterday);
  // };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gotALLDoctors !== this.props.gotALLDoctors) {
      console.log(this.props.gotALLDoctors);
      let DataSelect = this.buildDataInputSelect(this.props.gotALLDoctors);
      this.setState({
        listDoctors: DataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let DataSelect = this.buildDataInputSelect(this.props.gotALLDoctors);
      this.setState({
        listDoctors: DataSelect,
      });
    }
    if (prevProps.AllScheduleTime !== this.props.AllScheduleTime) {
      let data = this.props.AllScheduleTime;
      if (data && data.length > 0){
        data = data.map(item => {
          item.isSelected = false;
          return item;
        })
      }
      console.log(data)
      this.setState({
        rangeTime: this.props.AllScheduleTime,
      });
    }

  }

  // handleTimeRangeChange = (startTime, endTime) => {
  //   console.log("Received from child:", { startTime, endTime });
  //   this.setState({
  //     TimeRange: {
  //       startTime,
  //       endTime,
  //     },
  //   });
  // };

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    console.log("language: ", language);
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let TranFormeName = this.reverseName(item.name);
        let objectData = {};
        let labelVi = `${item.name}`;
        let labelEn = `${TranFormeName}`;
        objectData.label = language === LANGUAGES.VI ? labelVi : labelEn;
        objectData.value = item.id;
        result.push(objectData);
      });
    }
    return result;
  };
  removeVietnameseTones = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Bỏ dấu tiếng Việt
  };
  // Hàm đảo ngược tên
  reverseName = (name) => {
    const nameParts = name.split(" ").reverse(); // Tách họ tên và đảo ngược thứ tự
    const reversedName = nameParts.join(" "); // Ghép lại thành chuỗi
    return this.removeVietnameseTones(reversedName); // Bỏ dấu
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      selectedDateTime: date,
    });
    // let {selectedDateTime} = this.state;
  };

  handleChangeDayTime = (date) => {
    this.setState({ selectedDateTime: date });
  };
  handleChangeTime = (date) => {
    const hours = moment(date).format("HH:HH");
    console.log(hours);
    this.setState({ selectedTimeMiniut: date });
  };
  handleChange = async (SelectedDoctor) => {
    let DataSelect = this.buildDataInputSelect(this.props.gotALLDoctors);
    this.setState({
      SelectedDoctor,
    });
  };
  handleClickBttTime = (time) => {
    console.log(time)
    let {rangeTime}= this.state;
    if (rangeTime && rangeTime.length > 0) {
      let data = ""
      data = rangeTime.map(item => {
        if (item.id === time.id) item.isSelected = !item.isSelected; // <= lấy giá trị của chính nó và gán ngược lại
        return item;
        // else{
        //   item.isSelected = false;
        //   return item;
        // }
      })
      this.setState({
        rangeTime: data
      })
    }
  }
  handleSaveSchedule = () => {
    let {rangeTime,TimeDay,SelectedDoctor} = this.state;
    //toast
    if (!SelectedDoctor && _.isEmpty(SelectedDoctor)) {
      toast.error("Invalid Seclect Doctor!");
      return;
    }
    if (!TimeDay) {
      toast.error("Invalid Date!");
      return;
    }
    let formatDate = moment(TimeDay[0]).valueOf();

    let result = [];
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(item => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0){
        selectedTime.map(schedule => {
          let object = {};  
          object.doctorId = SelectedDoctor.value;
          object.dateSchedule = formatDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        })
        // console.log('check object: ',result)
      }
      this.props.SaveResultObject({
        arrSchedule: result,
        doctorId: SelectedDoctor.value,
        formatDate: formatDate,
      });
    }else{
      toast.error("Invalid Range Time!");
      return;
    }
  }
  render() {
    // console.log(this.state.selectedDateTime);
    // console.log(this.state.selectedTimeMiniut);
    // console.log(this.props.AllScheduleTime);
    console.log(this.state.rangeTime);
    let {
      rangeTime,
      isDayTime,
      isRangeTimeStart,
      isRangeTimeEnd,

      TimeStart,
      TimeEnd,
      TimeDay,
      TimeRange,
    } = this.state;

    let { selectedDateTime } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="manager-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="schedule.chooseDoctor" />
                </label>
                <Select
                  defaultValue={new Date()}
                  value={this.state.SelectedDoctor}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                  // formatOptionLabel={formatOptionLabel}
                  className="form-group col-md-12"
                  placeholder="Choose value or input"
                />
                {/* <input className="form-control" /> */}
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="schedule.chooseDateTime" />
                </label>
                {/* dây là nơi chọn ngày */}
                <DatePickerComponent
                  isDayTime={isDayTime}
                  handleTimeChangeInput={this.handleTimeChangeInput}
                />
              </div>
              <div className="col-8 form-group group-action-range-time">
                <label className="text-center label-time">
                  <FormattedMessage id="schedule.chooseTime" />
                </label>
                {/* đây là nơi chọn khoảng giờ */}
                <h6>Giờ Đầu</h6>
                <RangeTimeStart
                  isRangeTimeStart={isRangeTimeStart}
                  handleTimeChangeInput={this.handleTimeChangeInput}
                  // resetTime = {this.resetTime}
                />

                <h6>Giờ Cuối</h6>
                <RangeTimeEnd
                  isRangeTimeEnd={isRangeTimeEnd}
                  handleTimeChangeInput={this.handleTimeChangeInput}
                />
               <div className="col-12" style={{color: 'red'}}>{this.state.ErrorMessage}</div>
                <button
                  className="btn btn-success"
                  onClick={this.ArrCoupleTimeRange}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="col-12 btn-group pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button className= {item.isSelected === true ? "active" : " btn btn-secondary"} key={index} onClick={() => this.handleClickBttTime(item)  }>
                        {language === LANGUAGES.VI
                          ? item.valueVI
                          : item.valueEN}
                      </button>
                    );
                  })}
                {/* <FormattedDate value={this.state.selectedDateTime}/> */}
              </div>
              <div className="col-12 result-range-hours">
                {TimeRange &&
                  TimeRange.length > 0 &&
                  TimeRange.map((item, index) => {
                    console.log("TimeRange da thanh cong: ", item.start);
                    return (
                      <button className="button-73" key={index}>
                        {`${moment(item.start).format("H A")} - ${moment(
                          item.end
                        ).format("H A")}`}
                      </button>
                    );
                  })}
              </div>
              <div className="save-them">
                <button className="save32-button-primary" onClick={() => this.handleSaveSchedule()}>
                  <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </div>
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
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    gotALLDoctors: state.admin.AllDoctors,
    AllScheduleTime: state.admin.AllScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllDoctors: () => dispatch(action.fetchAllDoctor()),
    handleFindDoctor: () => dispatch(action.handleFindDoctor()),
    fetchAllScheduleDoctor: () =>
    dispatch(action.fectchAllscheduleTIMEDoctor()),
    SaveResultObject: (data) => dispatch(action.postScheduleDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedule);


