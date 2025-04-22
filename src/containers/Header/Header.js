import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, DoctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USE_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    console.log('isEmpty: ',!_.isEmpty(userInfo))

    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.user.roleId;
      if (role === USE_ROLE.ADMIN) {
        menu = adminMenu;
        console.log('menu: ',menu)

      }
      if (role === USE_ROLE.DOCTOR) {
        menu = DoctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
    console.log("check role: ",this.state.menuApp)

  }

  render() {
    const { processLogout, language, userInfo } = this.props;
    console.log("check props: !",this.props.userInfo);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />{" "}
            {userInfo && userInfo.user && userInfo.user.name
              ? userInfo.user.name
              : ""}
            !
          </span>
          <span
            className={
              language == LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={
              language == LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
