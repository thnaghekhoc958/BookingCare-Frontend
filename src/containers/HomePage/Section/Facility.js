import React, { Component } from "react"; 
import Slider from "react-slick";
import { connect } from "react-redux";

///fire action///
import {LANGUAGES} from '../../../utils';
import {changeLanguageApp} from '../../../store/actions'
import { FormattedMessage } from 'react-intl';


//src\store\actions\index.js

// Import images
import VietDuc from "../../../assets/healthcare-facility/083122lo-go-viet-duc.jpg";
import TrungUongQuanDoi from "../../../assets/healthcare-facility/085056logobenhvien108.jpg";
import DoctorCheck from "../../../assets/healthcare-facility/092249-doctor-check.jpg";
import ChoRay from "../../../assets/healthcare-facility/152704logo-bvcr-moi.jpg";
import HungViet from "../../../assets/healthcare-facility/153236-logo-hung-viet.jpg";
import DaihocYDuoc from "../../../assets/healthcare-facility/155206-logo-y-duoc-1.jpg";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Facility extends Component {
  render() {
    return (
      <div className="section-Facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="facility.healthcare facility"/></span>
            <button className="btn-section"><FormattedMessage id="facility.see more"/></button>
            <div className="section-body Facility-popular">
              <Slider {...this.props.settings}>
                {/* Thêm hình ảnh vào Slider */}
                <div className="img-customize">
                  <img className="image-config-child" src={VietDuc} alt="Cơ xương khớp" style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="facility.Vietduc University Hospital"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"   src={TrungUongQuanDoi} alt="Cột sống" style={{width: '200px',height: '200px'}}/>
                  <div className="text-child"><FormattedMessage id="facility.Periodic Health Examination Center, 108 Military Central Hospital"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={DoctorCheck} alt="Tai mũi họng" style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="facility.Doctor Check"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={ChoRay} alt="Tiêu hóa" style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="facility.Cho ray Hopspital"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={HungViet} alt="Tim mạch"style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="facility.Hung Viet Cancer Hospital"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={DaihocYDuoc} alt="Tim Mạch"style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="facility.University Medical Center Clinic 1 "/></div>
                </div>
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

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))

  };
};


export default connect()(Facility);
