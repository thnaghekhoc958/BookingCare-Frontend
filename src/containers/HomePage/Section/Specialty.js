import React, { Component } from "react"; 
import Slider from "react-slick";
import { connect } from "react-redux";
import "../StyleHomeHeader/Specialty.scss";
///fireAction///
import {LANGUAGES} from '../../../utils';
import {changeLanguageApp} from '../../../store/actions'
import { FormattedMessage } from 'react-intl';

// Import images
import CoXuongKhop from "../../../assets/images-sepcialty/101627-co-xuong-khop.png";
import CotSong from "../../../assets/images-sepcialty/101627-cot-song.png";
import TaiMuiHong from "../../../assets/images-sepcialty/101713-tai-mui-hong.png";
import TieuHoa from "../../../assets/images-sepcialty/101713-tieu-hoa.png";
import TimMach from "../../../assets/images-sepcialty/101713-tim-mach.png";
import ThanKinh from "../../../assets/images-sepcialty/101739-than-kinh.png";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="specialty.popular specialty"/></span>
            <button className="btn-section"><FormattedMessage id="facility.see more"/></button>
            <div className="section-body Specialty-medical">
              <Slider {...this.props.settings}>
                {/* Thêm hình ảnh vào Slider */}
                <div className="img-customize">
                  <img className="image-config-child" src={CoXuongKhop} alt="Cơ xương khớp" style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="specialty.musculoskeletal system"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"   src={CotSong} alt="Cột sống" style={{width: '200px',height: '200px'}}/>
                  <div className="text-child"><FormattedMessage id="specialty.spine"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={TaiMuiHong} alt="Tai mũi họng" style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="specialty.otorhinolaryngology "/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={TieuHoa} alt="Tiêu hóa" style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="specialty.digestive system"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={TimMach} alt="Tim mạch"style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="specialty.cardiovascular disease"/></div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={ThanKinh} alt="Than Kinh"style={{width: '200px',height: '200px'}} />
                  <div className="text-child"><FormattedMessage id="specialty.nervous system"/></div>
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

export default connect()(Specialty);
