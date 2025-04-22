import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import "./StyleHomeHeader/HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES,path } from "../../utils";

///////fire//////
import { changeLanguageApp } from "../../store/actions";
import { getInforSearchBox } from "../../services/userService";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: "",
      arrResult: [],
      message: "",
      isResult: false,
    };
    // this.mdEditorRef = React.createRef();
  }

  // handleClick = (event) => {
  //   console.log(
  //     `Bạn đã nhấp chuột tại tọa độ: (${event.clientX}, ${event.clientY})`
  //   );
  // };

  async componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  ChangeLanguage = (language) => {
    // alert(language)
    this.props.changeLanguageAppRedux(language);
  };

  //queryString
  handleChangeSearchBox = async (event, id) => {
    let copyState = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = copyState;
    this.setState(
      {
        ...stateCopy,
      },
      async () => {
        console.log("this.state: ", this.state);
        if (this.state.queryString && this.state.queryString.length > 0) {
          let res = await getInforSearchBox(this.state.queryString);
          if (res && res.errcode === 0) {
            console.log(res.data);
            this.setState({
              arrResult: res.data,
            });
          }
          if (res && res.errcode === 2) {
            console.log(res.errmessage);
            this.setState({
              message: res.errmessage,
            });
          }
        }
      }
    );
  };

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  handleViewSmartMedical = () => {
    this.props.history.push('/smart-medical-examination');
  }


  handleLogin = () => {
    this.props.history.push(path.LOGIN);
  }

  // Hàm này chỉ để hiển thị kết quả tìm kiếm
  renderSearchResults = () => {
    const { arrResult, language, message } = this.state;
    
    if (arrResult && arrResult.length > 0) {
        return (
            <div className="container result-arr">
                {arrResult.map((item, index) => {
                    let dataUrl = "";
                    let NameVi = `${item.positionData.ValueVi} ${item.name}`;
                    let NameEn = `${item.positionData.valueEn} ${item.name}`;

                    if (item.image) {
                        try {
                            // Kiểm tra xem dữ liệu đã có prefix data:image chưa
                            if (item.image.includes('data:image')) {
                                dataUrl = item.image;
                            } else {
                                // Nếu chưa có prefix, thêm vào
                                dataUrl = `data:image/jpeg;base64,${item.image}`;
                            }
                        } catch (error) {
                            console.error('Error processing image:', error);
                            // Sử dụng ảnh mặc định nếu có lỗi
                            dataUrl = '/default-avatar.png';
                        }
                    }

                    return (
                        <div
                            className="img-customize"
                            key={index}
                            onClick={() => this.handleViewDetailDoctor(item)}
                        >
                            <img
                                className="image-config-child"
                                src={dataUrl}
                                alt="Bác Sĩ"
                                style={{ width: "180px", height: "200px" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                            <div className="text-child">
                                <div>{language === LANGUAGES.VI ? NameVi : NameEn}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <div className="container result-arr">{message}</div>;
    }
  };


  render() {
    let language = this.props.language;
    let { arrResult, message } = this.state;
    console.log("check language: !", this.props.isOpenShowSticky);
    //   let NoInTopHeader = {
    //     zIndex: '9999',
    //     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    //     position: 'sticky',
    //     top: '0',
    //     backgroundColor: '#ffffff',
    //   }

    //   let resetSticky = {
    //     position: 'unset', // Hoặc 'unset' để loại bỏ sticky
    // };
    return (
      <React.Fragment>
        <div
          // className= {this.props.isOpenShowSticky ? "header-no-Sticky" : "home-header-container" }
          className="home-header-container"
          // style={this.props.isOpenShowSticky === true ? resetSticky : NoInTopHeader}
        >
          <div className="home-header-content">
            <div className="left-content">
              <i className="fa-sharp fa-solid fa-bars fa-fw"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <b>
                  <FormattedMessage id="home-header.speciality" />
                </b>
                <div className="Sub-title">
                  {" "}
                  <FormattedMessage id="home-header.find a doctor by specialty" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="home-header.choose a hospital clinic" />{" "}
                  </b>
                </div>
                <div className="Sub-title">
                  <FormattedMessage id="home-header.healthcare facility" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Doctors" />
                  </b>
                </div>
                <div className="Sub-title">
                  <FormattedMessage id="home-header.Choose Doctors" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Examination Package" />
                  </b>
                </div>
                {/* handleViewSmartMedical */}
                <div className="Sub-title" onClick={() => this.handleViewSmartMedical()}>
                  <FormattedMessage id="home-header.general health check-up" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fa-solid fa-question fa-fw"></i>
                <div className="child-support">
                  <FormattedMessage id="home-header.Support" />
                </div>
                <div className="flag">
                  <i className="fa-solid fa-flag fa-fw"></i>
                </div>
                {/* "language-vn active" */}
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vn active"
                      : "language-vn"
                  }
                >
                  <span onClick={() => this.ChangeLanguage(LANGUAGES.VI)}>
                    VI
                  </span>
                </div>
                {/* "language-en active" */}
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.ChangeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Đăng Nhập
              </button>
              <button className="btn-register" onClick={() => this.props.history.push(path.REGISTER)}>
                Đăng Ký
              </button>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title-1">
                <FormattedMessage id="home-header.HEALTHCARE SERVICE PLATFORM" />
              </div>

              <div className="title-2">
                <FormattedMessage id="home-header.BRINGING THE BEST EXPERIENCE TO CUSTOMERS" />
              </div>

              <div className="search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder=""
                  value={this.state.queryString}
                  onChange={(event) =>
                    this.handleChangeSearchBox(event, "queryString")
                  }
                  // placeholder={intl.formatMessage({ id: "home-header.find a doctor by specialty" })}
                  // {intl.FormattedMessage({id: "home-header.Find a Specialist for Medical Examination"})}
                ></input>
              </div>
            </div>
            {this.renderSearchResults()}
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Specialized Examination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-sharp-duotone fa-solid fa-mobile fa-fw"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Remote Examination" />
                  </div>
                </div>

                <div className="option-child" onClick={() => this.handleViewSmartMedical()}>
                  <div className="icon-child">
                    <i className="fa-regular fa-bed-pulse fa-fw"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.General Check-up" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-microscope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Medical examination test" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-heart fa-fw"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Mental Health" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-tooth fa-fw"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Dental Examination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader)); // Cập nhật dòng này