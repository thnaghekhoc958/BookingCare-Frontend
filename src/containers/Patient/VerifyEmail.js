import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {VerifyBookAppiontMent} from '../../services/userService';
import ScheduleMedicalAppointment from "./Doctor/Booking/ScheduleMedicalAppointment";
import VerifyEmailStyle from './VerifyEmailStyle.scss'
import HomeHeader from "../HomePage/HomeHeader";
import { isStatusVerify } from "../../store/actions";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        statusVerify: false,
        errcode: '',
    };
  }

  async componentDidMount() {
    //VerifyBookAppiontMent
    if(this.props.location && this.props.location.search) {
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId')
        let res = await VerifyBookAppiontMent({
            token: token,
            doctorId: doctorId
        })
        if (res && res.errcode === 0) {
            this.setState({
                statusVerify: true,
                errcode: res.errcode,
            },() => {
                this.props.isStatusVerify(this.state.statusVerify)
            })
        }else{
            this.setState({
                statusVerify: true,
                errcode: res && res.errcode ? res.errcode : -1,
            },() => {
                this.props.isStatusVerify(this.state.statusVerify)
            })
        }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {

  }


  render() {
    let {statusVerify,errcode} = this.state;
    console.log(this.state)
    return (
      <React.Fragment>
    <HomeHeader isShowBanner={false} />
    {
        statusVerify === false ? (
            <>
                <h1 className="verify-title">Đặt Lịch Khám Thành Công!</h1>
                <a className="verify-description" href="http://localhost:3000/">
                  Cảm ơn bạn đã đặt lịch khám bệnh với bác sĩ. Chúng tôi đã nhận
                  được thông tin và lịch hẹn của bạn.Nhấn vào đây để Quay lại Trang Chủ!
                </a>
              </>
            ) : (
              <>
                <h1 className="verify-title">Đặt Lịch Khám Không Thành Công!</h1>
                <a className="verify-description text-center" href="http://localhost:3000/">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận.Nhấn vào đây để Quay lại Trang Chủ!
                </a>
              </>
        )
    }

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    isStatusVerify: (status) => dispatch(isStatusVerify(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail);
