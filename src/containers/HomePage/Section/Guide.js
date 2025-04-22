import React, { Component } from "react"; 
import Slider from "react-slick";
import { connect } from "react-redux";

///fire action///
import {LANGUAGES} from '../../../utils';
import {changeLanguageApp} from '../../../store/actions'
import { FormattedMessage } from 'react-intl';


//src\store\actions\index.js

// Import images
import NiengRangUyTinHaNoi from "../../../assets/images-guide/085028-nieng-rang-uy-tin-ha-noi.png";
// import NguyenVanLieu from "../../../assets/images-Doctor/094041pho-giao-su-nguyen-van-lieu.jpg";
// import KieuDinhHung from "../../../assets/images-Doctor/104228-pgskd-hung.png";
// import TraAnhDuy from "../../../assets/images-Doctor/162212-1-bs-duy-2022.jpg";
// import PhanVuongHuyDong from "../../../assets/images-Doctor/171412-bs-phan-dong-huy-vuong.jpg";
// import PhamChiLang from "../../../assets/images-Doctor/174603-ts-bs-pham-chi-lang.jpg";



// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { truncate } from "lodash";

class Guide extends Component {
  render() {
    let settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
      }; 
    return (
      <div className="section-Guide">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="Guide.Guide"/></span>
            <button className="btn-section"><FormattedMessage id="facility.see more"/></button>
            <div className="section-body GuideOfWeek">
              <Slider {...settings}>
                {/* Thêm hình ảnh vào Slider */}
                <div className="img-customize">
                  <img className="image-config-child" src={NiengRangUyTinHaNoi} alt="Cơ xương khớp" style={{width: '200px',height: '200px'}} />
                  <div className="text-child">
                      {/* <FormattedMessage id="Doctor.associate professor,Doctor of Philosophy" />{" "}
                  <FormattedMessage id="Doctor.Dr.Nguyen Trong Hung" />  */}
                  </div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"   src={NiengRangUyTinHaNoi} alt="Cột sống" style={{width: '200px',height: '200px'}}/>
                  <div className="text-child">
                  {/* <FormattedMessage id="Doctor.associate professor,Doctor of Philosophy" />{" "}
                  <FormattedMessage id="Doctor.Dr.Nguyen Van Lieu" />     */}
                          </div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={NiengRangUyTinHaNoi} alt="Tai mũi họng" style={{width: '200px',height: '200px'}} />
                  <div className="text-child">
                    {/* <FormattedMessage id="Doctor.associate professor,Doctor of Philosophy" />{" "}
                  <FormattedMessage id="Doctor.Dr.Kieu Dinh Hung" />  */}
                   </div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={NiengRangUyTinHaNoi} alt="Tiêu hóa" style={{width: '200px',height: '200px'}} />
                  <div className="text-child">
                    {/* <FormattedMessage id="Doctor.Doctor of Philosophy, Doctor specialty" />{" "}
                  <FormattedMessage id="Doctor.Dr.Tra Anh Duy" /> */}
                   </div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={NiengRangUyTinHaNoi} alt="Tim mạch"style={{width: '200px',height: '200px'}} />
                  <div className="text-child">
                    {/* <FormattedMessage id="Doctor.Doctor Specialty" />{" "}
                  <FormattedMessage id="Doctor.Dr.Phan Vuong Huy Dong" /> */}
                   </div>
                </div>
                <div className="img-customize">
                  <img className="image-config-child"  src={NiengRangUyTinHaNoi} alt="Tim Mạch"style={{width: '200px',height: '200px'}} />
                  <div className="text-child">
                    {/* <FormattedMessage id="Doctor.Doctor of Philosophy,Doctor" />{" "}
                  <FormattedMessage id="Doctor.Dr.Pham Chi Lang" />  */}
                  </div>
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


export default connect()(Guide);
