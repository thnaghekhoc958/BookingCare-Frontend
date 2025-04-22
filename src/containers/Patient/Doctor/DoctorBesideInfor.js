import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";

import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter/HomeFooter";
import DatePickerComponent from "../../System/Doctor/DateTime/SingleDateSelector";
import DoctorBesideInforStyle from "../css/DoctorBesideInforStyle.scss";

// fireBase
import * as action from "../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { Label } from "reactstrap";
import { toast } from "react-toastify";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InforDoctor: {},
      isOnInfor: false,
    };
  }

  async componentDidMount() {
    this.props.changeLanguageAppRedux();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      //   let dateLanguage = this.setArrDays();
      //   this.setState({
      //     allDays: dateLanguage,
      //   });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      this.props.getBesideInfor(this.props.doctorId);
    }
    if (prevProps.addInforDoctor !== this.props.addInforDoctor) {
      this.setState({
        InforDoctor: this.props.addInforDoctor,
      });
    }
  }

  IsWatchAddInfor = () => {
    this.setState(
      {
        isOnInfor: !this.state.isOnInfor,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    let { language, ScheduleDoctors } = this.props;
    let { InforDoctor } = this.state;
    console.log("InforDoctor.priceData: ", InforDoctor);

    let valuePriceVI = "",
      valuePriceEN = "",
      valueProvinceVI = "",
      valueProvinceEN = "",
      valuePaymentVI = "",
      valuePaymentEN = "";
    if (
      InforDoctor &&
      InforDoctor.priceData &&
      InforDoctor.provinceData &&
      InforDoctor.paymentData
    ) {
      valuePriceVI = `${InforDoctor.priceData.valueVI} VNĐ`;
      valuePriceEN = `${InforDoctor.priceData.valueEN} USD`;

      valueProvinceVI = `${InforDoctor.provinceData.valueVI}`;
      valueProvinceEN = `${InforDoctor.provinceData.valueEN}`;

      valuePaymentVI = `${InforDoctor.paymentData.valueVI}`;
      valuePaymentEN = `${InforDoctor.paymentData.valueEN}`;
    }

    return (
      <React.Fragment>
        <div className="clinic-info">
          <div className="clinic-address">
            <strong>ĐỊA CHỈ KHÁM</strong>
            <p className="clinic-name">
              {" "}
              {InforDoctor && InforDoctor.nameClinic
                ? InforDoctor.nameClinic
                : "tạm thời chưa có tên Phòng Khám"}
            </p>
            <p className="clinic-location">
              {InforDoctor && InforDoctor.addressClinic
                ? InforDoctor.addressClinic
                : "tạm thời chưa có địa chỉ, Xin lỗi khách Hàng vì sự cố bất tiện này"}
            </p>
            <p className="promotion">
              <span className="icon">⚠</span>{" "}
              {InforDoctor && InforDoctor.note
                ? InforDoctor.note
                : "không có ghi chú"}
            </p>
          </div>
          <div className="clinic-price">
            <strong>GIÁ KHÁM:</strong>
            <span>
              {language === LANGUAGES.VI ? valuePriceVI : valuePriceEN}
            </span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.IsWatchAddInfor()}
              style={{ border: "none",marginLeft: "10px" }}
            >
             {this.state.isOnInfor === true ? "Thu Gọn" : " Xem chi tiết"}
            </button>
          </div>
          <div className="clinic-insurance">
          
            {this.state.isOnInfor == true && (
          <div className="container-fluid infor-besides">
          <label>
            <i className="fa-solid fa-location-dot"></i>
            {language === LANGUAGES.VI
                    ? "tỉnh và thành phố: "
                    : "Province and Cities:  "}<span>  {language === LANGUAGES.VI
                      ? valueProvinceVI
                      : valueProvinceEN}</span>
          </label>
          <label>
            <i className="fa-solid fa-cart-shopping"></i>
            {language === LANGUAGES.VI
                    ? "phương thức thanh toán: "
                    : "Method Payment:  "} <span> {language === LANGUAGES.VI ? valuePaymentVI : valuePaymentEN} </span>
          </label>
        </div>
        
            )}
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
    addInforDoctor: state.admin.addInforDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getScheduleOfDoctor: (doctorId, date) =>
      dispatch(action.getScheduleOfDoctor(doctorId, date)),
    getBesideInfor: (id) => dispatch(action.getBesideInfor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
