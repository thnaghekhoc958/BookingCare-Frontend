import React, { Component } from "react";
// import Slider from "react-slick";
import { connect } from "react-redux";

///fire action///
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";

//src\store\actions\index.js

// Import images
// import NiengRangUyTinHaNoi from "../../../assets/images-AboutMe/085028-nieng-rang-uy-tin-ha-noi.png";
// import NguyenVanLieu from "../../../assets/images-Doctor/094041pho-giao-su-nguyen-van-lieu.jpg";
// import KieuDinhHung from "../../../assets/images-Doctor/104228-pgskd-hung.png";
// import TraAnhDuy from "../../../assets/images-Doctor/162212-1-bs-duy-2022.jpg";
// import PhanVuongHuyDong from "../../../assets/images-Doctor/171412-bs-phan-dong-huy-vuong.jpg";
// import PhamChiLang from "../../../assets/images-Doctor/174603-ts-bs-pham-chi-lang.jpg";

// Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { truncate } from "lodash";

class AboutMe extends Component {
  render() {
    // let settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 800,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //   };
    return (
      <div className="section-AboutMe">
        <div className="section-about-header">
            <h4>Giới Thiệu về Đồ Án và Trường Đại Học Thủ dầu Một</h4>
          Phòng khám đa khoa BookingCare là một trong những phòng khám trực
          thuộc Bộ Y Tế. Phòng khám cung cấp dịch vụ khám chữa bệnh cho nhiều
          chuyên khoa khác nhau như Nội, Ngoại, Tai Mũi Họng, Mắt, Da Liễu, v.v.
          Phòng khám bao gồm nhiều bác sĩ chuyên môn với các lịch khám cố định
          hàng tuần, giúp bệnh nhân có thể lựa chọn bác sĩ và thời gian khám phù
          hợp.
        </div>
        <div className="section-about-video">
          <iframe
            width="600"
            height="300"
            src="https://www.youtube.com/embed/6mTrVUTj4tE"
            title="Giới thiệu ĐH Thủ Dầu Một"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect()(AboutMe);
