import React, { Component,createRef  } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./login.scss";
import { FormattedMessage } from "react-intl";
import { KeyCodeUtils, LanguageUtils,LANGUAGES,CommonUtils } from "../../utils";
// import { LANGUAGES, USE_ROLE } from "../../utils";

import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
//utils
// import adminService from '../services/adminService';

import { handleLoginAPI,verifyTokenCaptcha } from "../../services/userService";

class Login extends Component {
  onChangeCaptCha = async(value) => {
    // console.log("Captcha value:", value);
    let res = await verifyTokenCaptcha(value);
    if (res && res.errcode == 0){
      this.setState({
        isCheckVerifyCaptCha: !this.state.isCheckVerifyCaptCha
      })
    }else{
      toast.error(res.errmessage)
    }
  };
  constructor(props) {
    super(props);
    this.captcha = createRef(); // Tạo ref để tham chiếu đến reCAPTCHA

    this.state = {
      email: "",
      password: "",
      ErrorMessage: "",
      isShowPassword: false,

      isCheckVerifyCaptCha: false,
    };
  }

  handleOnChangeInputUser = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    // console.log('${name}: ${value}');
    // console.log(`${name}: ${value}`);
  };

  handleLogin = async () => {
    this.setState({
      ErrorMessage: "",
    });
    this.captcha.reset()
    console.log(this.captcha)

    if (this.state.isCheckVerifyCaptCha === true) {
      try {
        let data = await handleLoginAPI(this.state.email, this.state.password);
        console.log(data.userdata.errcode);
        if (data.userdata.errcode === 0) {
          this.setState({
            ErrorMessage: data.userdata.errMessage,
            isCheckVerifyCaptCha: !this.state.isCheckVerifyCaptCha

          },() => {
          });
          // console.log(data.userdata)
          this.props.userLoginSucess(data.userdata);
        }
        else if (data && data.errcode === 2) {
          let message = `${data.errMessage} ${'thời gian còn lại trước khi tiếp tục là: '} ${data.retryAfter}`
          this.setState({
            ErrorMessage: message,
          });
        }
        else {
          this.setState({
            ErrorMessage: data.userdata.errMessage,
          });
        }
        
      } 
      catch (e) {
        if (e.response) {
          if (e.response.data) {
            this.setState({
              ErrorMessage: e.response.data.errMessage,
            });
          }
        }
      }
    }else{
      toast.error("You haven't checked the CaptCha Box")
    }
  };
  handlesSowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
    // alert('clik-me')
  };
  //   handleOnChangeInputUser = (event) => {
  //     this.setState({ email: event.target.value });
  //     this.setState({ password: event.target.value });
  //     console.log(event.target.value);
  //   };
  //   handleOnChangeInputPassword = (event) => {
  //     this.setState({ password: event.target.value });
  //     console.log(event.target.value);
  //   };

  handlerKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  handleOnchangeImage = async(event) => {
    let data = event.target.files;
    let file = data[0];
    // console.log("data files is : ",file)
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        imageBase64: base64,
      },() => {
        console.log("copyState: ", this.state.avatar); // Đặt console.log trong callback của setState
      });
    } else {
      alert("Image not found!");
    }
  };

  //6Lc5F48qAAAAAMwOV_pdYmrQ81O7QqDApKwYnbmd
  render() {
    let {language} = this.props;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center text-login">Register</div>
            <div className="col-12 form-group login-input">
              <label>email</label>
              {/* <div className="text-login-email"></div> */}
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={this.state.email}
                // onChange={(event) => this.handleOnChangeInputUser(event)}
                onChange={this.handleOnChangeInputUser}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Full Name</label>
              {/* <div className="text-login-email"></div> */}
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                name="name"
                value={this.state.name}
                // onChange={(event) => this.handleOnChangeInputUser(event)}
                onChange={this.handleOnChangeInputUser}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Phone Number</label>
              {/* <div className="text-login-email"></div> */}
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Phone Number"
                name="phonenumber"
                value={this.state.phonenumber}
                // onChange={(event) => this.handleOnChangeInputUser(event)}
                onChange={this.handleOnChangeInputUser}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Address</label>
              {/* <div className="text-login-email"></div> */}
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Address"
                name="address"
                value={this.state.address}
                // onChange={(event) => this.handleOnChangeInputUser(event)}
                onChange={this.handleOnChangeInputUser}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>image</label>
              {/* <div className="text-login-email"></div> */}
              <input className="form-control" type="file" onChange={(event) => this.handleOnchangeImage(event)}/>
            </div>

            <div className="col-12 form-group">
              <label>PassWord</label>
              <div className="form-controll-eyes">
                {" "}
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your PassWord"
                  name="password"
                  value={this.state.password}
                  // onChange={(event) => this.handleOnChangeInputPassword(event)}
                  onChange={this.handleOnChangeInputUser}
                  onKeyDown={(event) => this.handlerKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handlesSowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fa-regular fa-eye eye-show-password"
                        : "fa-regular fa-eye-slash fa-fw eye-show-password"
                    }
                  ></i>
                  {/* <i className="fa-regular fa-eye"></i> */}
                  {/* <i className="fa-regular fa-eye-slash fa-fw"></i> */}
                </span>
              </div>
            </div>
            
            <ReCAPTCHA
              sitekey="6Lc5F48qAAAAAMwOV_pdYmrQ81O7QqDApKwYnbmd"
              onChange={this.onChangeCaptCha}
              hl= {language === LANGUAGES.VI ? 'vi' : 'en'}
              badge="inline"
              ref={(r) => this.captcha = r}
              />
            
            <div className="col-12" style={{ color: "red" }}>
              {this.state.ErrorMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                LOGIN
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password"> forgot your Password? </span>
            </div>
            <div className="col-12 mt-3 text-center">
              <span className="text-orther-login">Or Login With: </span>
            </div>
            <div className="col-12 text-center social-login">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSucess: (userInfo) => dispatch(actions.userLoginSucess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
