import React, { Component } from "react";
// import Slider from "react-slick";
import { connect } from "react-redux";

///fire action///
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="section-HomeFooter">
        <p>
          &copy; 2024 Đồ Án được thực hiện bởi Dương Lê Tiến Tấn. More
          Information,plsease &#8594;{" "}
          <a target="_blank" href="https://www.youtube.com/watch?v=3d0seUD_NlQ">
            Click Me &#8592;
          </a>
        </p>
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

export default connect()(HomeFooter);
