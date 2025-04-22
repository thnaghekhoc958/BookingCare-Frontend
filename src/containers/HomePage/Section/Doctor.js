import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import DetailDoctor from "../../Patient/Doctor/DetailDoctor";
import { withRouter } from "react-router";
///fire action///
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// action fire-base
import * as actions from "../../../store/actions";

// function History() {
//   let history = useHistory();
//   let location = useLocation();
//   // console.log(history)
//   // return<h2>Hello Display</h2>
// }

class Doctor extends Component {


  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  async componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctor: this.props.topDoctors,
      },() =>{
        console.log(this.props.topDoctors)
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`)
  }
  render() {
    let arrDoctorTop = this.state.arrDoctor;
    let language = this.props.language;
    console.log(this.props);
    return (
      <div className="section-Doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="Doctor.Doctor of the Week" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="facility.see more" />
            </button>
            <div className="section-body DoctorWeek">
              <Slider {...this.props.settings}>
                {/* Thêm hình ảnh vào Slider arrDoctor */}
                {arrDoctorTop &&
                  arrDoctorTop.length > 0 &&
                  arrDoctorTop.map((item,index) => {
                    let dataUrl = item.image;
                    // if (item.image) {
                    //   dataUrl = new Buffer(item.image, "base64").toString("binary");
                      console.log("dataUrl: ",dataUrl)
                    // }
                    let NameVi = `${item.positionData.ValueVi} ${item.name}`
                    let NameEn = `${item.positionData.valueEn} ${item.name}`
                    console.log("let NameEn: ",NameEn)
                    console.log("let NameVi: ",NameVi)
                    console.log("let languages: ",language)

                    return (
                      <div className="img-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                        <img
                          className="image-config-child"
                          src={dataUrl}
                          alt="Bác Sĩ"
                          style={{ width: "180px", height: "200px" }}
                        />
                        <div className="text-child">
                          <div>
                            {language === LANGUAGES.VI ? NameVi: NameEn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
