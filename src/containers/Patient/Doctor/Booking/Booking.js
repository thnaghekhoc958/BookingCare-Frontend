import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import HomeHeader from "../../../HomePage/HomeHeader";

// fireBase
import * as action from "../../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../../utils";
import { changeLanguageApp } from "../../../../store/actions";
import { Label } from "reactstrap";
import { toast } from "react-toastify";
import { isNullishCoalesce } from "typescript";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    this.props.changeLanguageAppRedux();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {

  }


  render() {

    return (
      <React.Fragment>
        <div>
     
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
