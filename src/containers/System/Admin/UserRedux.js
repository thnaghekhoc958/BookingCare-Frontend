import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import ModalImage from "react-modal-image";
// import ViewTable from "./ViewTable";
import UsersTable from "./UsersTable";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { getAllCodeService } from "../../../services/userService";

///fire action///
import { LANGUAGES,CommonUtils } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";

import styleUserRedux from "./styleAdmin/StyleUserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImg: null,
      isopenImage: false,
      // sate_Modal
      isOpenModal: false,
      // state_user
      email: "",
      password: "",
      name: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      roleid: "",
      avatar: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart(); // c1
    this.props.getRoleStart();
    this.props.getPositionStart();
    // this.props.dispatch(actions.getGenderStart()) //c2
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderStartArr = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender:
          genderStartArr && genderStartArr.length > 0
            ? genderStartArr[0].keyMap
            : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      let roleStartArr = this.props.roles;
      this.setState({
        roleArr: this.props.roles,
        roleid:
          roleStartArr && roleStartArr.length > 0 ? roleStartArr[0].keyMap : "",
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let positionStartArr = this.props.positions;
      this.setState({
        positionArr: this.props.positions,
        position:
          positionStartArr && positionStartArr.length > 0
            ? positionStartArr[0].keyMap
            : "",
      });
    }
    if (prevProps.resetState !== this.props.resetState) {
      let genderStartArr = this.props.genderRedux;
      let roleStartArr = this.props.roles;
      let positionStartArr = this.props.positions;

      this.setState({
        email: "",
        password: "",
        name: "",
        phonenumber: "",
        address: "",
        gender:
          genderStartArr && genderStartArr.length > 0
            ? genderStartArr[0].keyMap
            : "",
        position:
          positionStartArr && positionStartArr.length > 0
            ? positionStartArr[0].keyMap
            : "",
        roleid:
          roleStartArr && roleStartArr.length > 0 ? roleStartArr[0].keyMap : "",
        avatar: "",
      });
    }
  }

  ModalViewTable = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  closeLightbox = () => {
    this.state.isopenImage = true;
    // this.setState({
    //   isopenImage : !this.state.isopenImage
    // })
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let arrCheck = [
      "email",
      "password",
      "name",
      "phonenumber",
      "address",
      "gender",
      "position",
      "roleid",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Notification!, you have not entered a " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    this.props.createNewUser({
      name: this.state.name,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      address: this.state.address,
      password: this.state.password,
      gender: this.state.gender,
      roleid: this.state.roleid,
      position: this.state.position,
      image: this.state.avatar,
    });
    console.log("this.props.createNewUser is : ", this.props);
    // toast.loading("Please wait...")
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
        avatar: base64,
      },() => {
        console.log("copyState: ", this.state.avatar); // Đặt console.log trong callback của setState
      });
    } else {
      alert("Image not found!");
    }
  };

  render() {
    // console.log('let response check state: ',this.state.genderArr);

    let isLoadingGender = this.props.isLoadingGender;
    let isLoadingRoles = this.props.isLoadingRoles;
    let isLoadingPosition = this.props.isLoadingPosition;

    let language = this.props.language;
    let genders = this.state.genderArr;
    let roleId = this.state.roleArr;
    let positions = this.state.positionArr;

    console.log("props from redux is : ", this.props);

    let {
      email,
      password,
      name,
      phonenumber,
      address,
      gender,
      position,
      roleid,
      avatar,
    } = this.state;
    return (
      <React.Fragment>

      <div className="user-redux-container">
        <div className="title">
          {" "}
          <FormattedMessage id="manage-user.Edit User With Redux" />{" "}
        </div>

        <div>
          {isLoadingGender === false &&
          isLoadingRoles === false &&
          isLoadingPosition === false
            ? "loading false"
            : ""}
        </div>

        <div className="user-redux-body">
          <div className="container redux-body">
            <form className="row g-3 form-container-home form-redux-home">
              <div className="col-md-6">
                <label form="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                />
              </div>

              <div className="col-md-6">
                <label form="inputPassword4" className="form-label">
                  <FormattedMessage id="manage-user.Password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                />
              </div>

              <div className="col-md-6">
                <label form="inputEmail4" className="form-label">
                  <FormattedMessage id="manage-user.Full Name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={name}
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                />
              </div>

              <div className="col-md-6">
                <label form="inputEmail4" className="form-label">
                  <FormattedMessage id="manage-user.Phone Number" />
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputEmail4"
                  value={phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phonenumber");
                  }}
                />
              </div>

              <div className="col-12">
                <label form="inputAddress" className="form-label">
                  <FormattedMessage id="manage-user.Address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>

              <div className="col-md-4">
                <label form="inputState" className="form-label">
                  <FormattedMessage id="manage-user.Gender" />
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  // value={gender}
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      // console.log('item is: ',item)
                      // console.log('index is: ',index)

                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-md-4">
                <label form="inputState" className="form-label">
                  <FormattedMessage id="manage-user.Position" />
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                >
                  {/* positions */}
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* //roleId */}
              <div className="col-md-4">
                <label form="inputState" className="form-label">
                  <FormattedMessage id="manage-user.Role Id" />
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(event) => {
                    this.onChangeInput(event, "roleid");
                  }}
                >
                  {roleId &&
                    roleId.length > 0 &&
                    roleId.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language == LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-12 save-and-image-profile">
                <label form="inputAddress2" className="form-label"></label>
                <div className="button-upload-file-image">
                  {" "}
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="picture-upload" htmlFor="previewImg">
                    <FormattedMessage id="manage-user.Image" />
                    <i className="fa-solid fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImg})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat", // Đúng cách viết
                      backgroundPosition: "center",
                      width: "100px", // Kích thước cụ thể của div chứa ảnh
                      height: "100px",
                    }}
                  >
                    <ModalImage
                      className="profile-picture"
                      small={this.state.previewImg}
                      medium={this.state.previewImg}
                      large={this.state.previewImg}
                      // hideZoom = {true}
                      hideDownload={false}
                      hideZoom={false}
                      onClose={this.closeLightbox}
                    />
                  </div>
                </div>
                <div className="col-6 text-end btn-bttn-save">
                  <div className="btn-group button-view-table">
                    <button
                      type="button"
                      className="button-88"
                      onClick={() => this.ModalViewTable()}
                    >
                      {/* <ViewTable
                      ModalViewTable = {this.ModalViewTable}
                      isOpenModal = {this.state.isOpenModal}
                    /> */}
                      <UsersTable
                        ModalViewTable={this.ModalViewTable}
                        isOpenModal={this.state.isOpenModal}
                      />
                      <FormattedMessage id="manage-user.view-table" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleSaveUser()}
                  >
                    <FormattedMessage id="manage-user.Save" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    /// loading
    isLoadingGender: state.admin.isLoadingGender,
    isLoadingRoles: state.admin.isLoadingRoles,
    isLoadingPosition: state.admin.isLoadingPosition,
    /// state object
    genderRedux: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    // reset
    resetState: state.admin.reset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    ///
    getGenderStart: () => dispatch(action.fetchGenderStart()),
    getRoleStart: () => dispatch(action.fetchRoleIdStart()),
    getPositionStart: () => dispatch(action.fetchPositionStart()),
    createNewUser: (data) => dispatch(action.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
