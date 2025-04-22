import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter/HomeFooter";
import DetailDoctorStyle from "../css/DetailDoctorStyle.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorBesideInfor from "./DoctorBesideInfor";
// fireBase
import * as action from "../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrDetailDoctor: [],
    };
  }
  async componentDidMount() {
    this.props.changeLanguageAppRedux();
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let doctorId = this.props.match.params.id;
      this.props.handleDoctorId(doctorId);
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.thisIsInforDoctor !== this.props.thisIsInforDoctor) {
      this.setState({
        ArrDetailDoctor: this.props.thisIsInforDoctor,
      });
    }
  }
  render() {
    let Detail = this.state.ArrDetailDoctor;
    let { language } = this.props;
    let NameEn = "",
      NameVi = "";
    if (Detail && Detail.positionData && Detail.roleData) {
      NameVi = `${Detail.positionData.ValueVi} ${Detail.roleData.ValueVi} ${Detail.name}`;
      NameEn = `${Detail.positionData.valueEn} ${Detail.roleData.valueEn} ${Detail.name}`;
    }
    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="description-initially-1">
            <div className="content-left">
              <img
                className="img-custom-image"
                src={this.state.ArrDetailDoctor.image}
                alt="Doctor Detail"
              />
            </div>
            <div className="content-right">
              <div className="up">
                <span className="title-name-doctor-1">
                  {language === LANGUAGES.VI ? NameVi : NameEn}
                </span>
              </div>
              <div className="down">
                {Detail &&
                  Detail.MarkDownObject &&
                  Detail.MarkDownObject.description && (
                    <span className="description-doctor-2">
                      {Detail.MarkDownObject.description}
                    </span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-address-2">
            <div className="shcedule-content-left">
              <DoctorSchedule doctorId={Detail.id} />
            </div>
            <div className="shcedule-content-right">
              <DoctorBesideInfor doctorId={Detail.id} />
            </div>
          </div>
          <div className="description-Detail-Doctor-3">
            {Detail &&
              Detail.MarkDownObject &&
              Detail.MarkDownObject.contentHTML && (
                <div
                  className="MarkDown-Content-doctor-2"
                  dangerouslySetInnerHTML={{
                    __html: Detail.MarkDownObject.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor-4"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //
    thisIsInforDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    handleDoctorId: (doctorId) =>
      dispatch(action.fectchDetialInforDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
