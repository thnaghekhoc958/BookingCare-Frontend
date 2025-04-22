import React, { Component, useState } from "react";
import { connect, useSelector } from "react-redux";
import Table from "./styleAdmin/Table.scss";
import UsersTableStyle from "./styleAdmin/UsersTableStyle.scss";
import DataTable from "react-data-table-component";
import ModalImage from "react-modal-image";

/// fire action
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions";
import { changeLanguageApp } from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";

// import { emitter } from "../../utils/emitter";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Row,
} from "reactstrap";

class ViewTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      userArr: [],
      previewImg: null,
      isopenImage: false,
      isEditing: "",
      currentItemImage: "",
      // sate_Modal
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
      action: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart(); // c1
    this.props.getRoleStart();
    this.props.getPositionStart();
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gotAllUsers !== this.props.gotAllUsers) {
      this.setState({
        userArr: this.props.gotAllUsers,
        action: CRUD_ACTIONS.READ,
      });
    }
    if (prevProps.genderRedux !== this.props.genderRedux) {
      // const UserGenderStart = this.props.gotAllUsers.map((item) => item.gender);
      // console.log("UserGenderStart: ", UserGenderStart);
      this.setState(
        {
          genderArr: this.props.genderRedux,
        }
        // () => {
        //   console.log("this.state with prevProps.genderRedux ", this.state);
        // }
      );
    }
    if (prevProps.roles !== this.props.roles) {
      this.setState({
        roleArr: this.props.roles,
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let positionStartArr = this.props.positions;
      this.setState({
        positionArr: this.props.positions,
      });
    }
    // if (prevProps.resetState !== this.props.resetState) {
    //   let genderStartArr = this.props.genderRedux;
    //   let roleStartArr = this.props.roles;
    //   let positionStartArr = this.props.positions;

    //   this.setState({
    //     email: "",
    //     password: "",
    //     name: "",
    //     phonenumber: "",
    //     address: "",
    //     gender:
    //       genderStartArr && genderStartArr.length > 0
    //         ? genderStartArr[0].key
    //         : "",
    //     position:
    //       positionStartArr && positionStartArr.length > 0
    //         ? positionStartArr[0].key
    //         : "",
    //     roleid:
    //       roleStartArr && roleStartArr.length > 0 ? roleStartArr[0].key : "",
    //     avatar: "",
    //   });
    // }
  }

  toggle = () => {
    this.props.ModalViewTable();
  };

  closeLightbox = () => {
    // this.state.isopenImage = true;
    this.setState({
      isopenImage : !this.state.isopenImage
    })
  };
  //delete
  handleDeleteUsers = (id) => {
    this.setState({
      action: CRUD_ACTIONS.READ,
    });
    this.handleEditUsers(id);
    this.props.genDeleteUser(id);
  };

  handleCancelEdit = (id) => {
    this.handleOnAndOffRow(id);
    this.setState({
      action: CRUD_ACTIONS.READ,
    });
  };
  //
  //
  handleOnAndOffRow = (rowId) => {
    this.setState((prevState) => {
      const newEditingState = {
        ...prevState.isEditing,
        currentIDItemOpen: rowId,
        [rowId]: !prevState.isEditing[rowId], // Đổi trạng thái true/false cho hàng này
      };
      console.log("isEditing state:", newEditingState); // In ra trạng thái mới
      return { isEditing: newEditingState }; // Cập nhật state
    });
  };

  handleEditUsers = (users, rowId, imageUrl) => {
    // console.log("RoW.id of id: ", rowId);
    // console.log("users of id: ", users);
    this.handleOnAndOffRow(rowId);
    this.setState({
      email: users.email,
      password: users.address,
      name: users.name,
      phonenumber: users.phonenumber,
      address: users.address,
      gender: users.gender,
      position: users.positionId,
      roleid: users.roleId,
      avatar: imageUrl,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  handleUpdatedUsers = (id) => {
    let isVaild = this.checkValidateInput();
    if (isVaild === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.UpdateNewUser({
        id: id,
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
      this.handleOnAndOffRow(id);
      this.setState({
        action: CRUD_ACTIONS.READ,
      });
    }
  };

  checkValidateInput = () => {
    let arrCheck = [
      "email",
      "password",
      "name",
      "phonenumber",
      "address",
      "position",
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

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("copyState: ", this.state); // Đặt console.log trong callback của setState
      }
    );
  };
  // image
  //CommonUtils
  handleOnchangeImage = async (event, id) => {
    let data = event.target.files;
    let file = data[0];
    // console.log("data files is : ",file)
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImg: objectUrl,
        avatar: base64,
      });
    } else {
      alert("Image not found!");
    }
  };

  render() {
    console.log(this.props);
    let {
      email,
      name,
      phonenumber,
      address,
      gender,
      position,
      roleid,
      avatar,
    } = this.state;
    const columns = [
      {
        name: (
          <FormattedMessage id="manage-user.Index" defaultMessage="Index" />
        ),
        selector: (Row) => Row.id,
        sortable: true,
      },
      {
        name: "Email",
        selector: (Row) => Row.email,
        width: "250px",
        cell: (Row) => {
          // const emails = this.props.gotAllUsers.map((item) => item.email)
          return (
            <div class="col-lg-12">
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>{Row.email ? Row.email : "Unknown"}</span>
                </div>
              ) : (
                <div>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    value={email}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                  />
                </div>
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage id="manage-user.Address" defaultMessage="Address" />
        ),
        selector: (Row) => Row.address,
        width: "250px",
        cell: (Row) => {
          // const addresss = this.props.gotAllUsers.map((item) => item.address)
          return (
            <div class="col-lg-12">
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>{Row.address ? Row.address : "Unknown"}</span>
                </div>
              ) : (
                <div>
                  <input
                    type="address"
                    className="form-control"
                    id="inputaddress4"
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage
            id="manage-user.Full Name"
            defaultMessage="Full Name"
          />
        ),
        selector: (Row) => Row.name,
        width: "250px",
        cell: (Row) => {
          // const names = this.props.gotAllUsers.map((item) => item.name)
          return (
            <div class="col-lg-12">
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>{Row.name ? Row.name : "Unknown"}</span>
                </div>
              ) : (
                <div>
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
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage
            id="manage-user.Phone Number"
            defaultMessage="Phone Number"
          />
        ),
        selector: (Row) => Row.phonenumber,
        cell: (Row) => {
          return (
            <div class="col-lg-12">
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>{Row.phonenumber ? Row.phonenumber : "Unknown"}</span>
                </div>
              ) : (
                <div>
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
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage id="manage-user.Image" defaultMessage="Image" />
        ),
        // selector: (Row) => ( Row.image ?  Row.image : "unkonwn"),
        selector: (Row) => Row.image,
        width: "250px",
        height: "10px",
        cell: (Row) => {
          if (Row.image) {
            let dataUrl = "";
            dataUrl = new Buffer(Row.image, "base64").toString("binary");
            Row.dataUrl = dataUrl;
            return (
              <div class="col-lg-12">
                {this.state.isEditing[Row.id] !== true ? (
                  <div
                    className="preview-image"
                  >
                   <img
                          className="image-config-child"
                          src={dataUrl}
                          alt="Bác Sĩ"
                          style={{ width: "50px", height: "50px" }}
                        />
                      {this.state.isopenImage && (
                        <ModalImage
                        className="profile-picture"
                        small={dataUrl}
                        medium={dataUrl}
                        large={dataUrl}
                        // hideZoom = {true}
                        hideDownload={false}
                        hideZoom={false}
                        onClick={() => this.closeLightbox()}
                      />
                      )}
                  </div>
                ) : (
                  <div className="button-upload-file-image">
                    {" "}
                    <input
                      id="previewImg"
                      type="image"
                      hidden
                      value={this.state.avatar}
                      width="48"
                      height="48"
                      onChange={(event) =>
                        this.handleOnchangeImage(event, "avatar")
                      }
                    />
                    <label className="picture-upload" htmlFor="previewImg">
                      {/* <FormattedMessage id="manage-user.Image" /> */}
                      <i className="fa-solid fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      //dataUrl
                      style={{
                        backgroundImage: `url(${this.state.avatar})`,
                        // backgroundImage: `url(${this.state.previewImg ? this.state.previewImg : dataUrl})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat", // Đúng cách viết
                        backgroundPosition: "center",
                        // Không lặp lại hình ảnh
                        width: "50px", // Kích thước cụ thể của div chứa ảnh
                        height: "50px",
                      }}
                    >
                      <ModalImage
                        className="profile-picture"
                        small={this.state.avatar}
                        medium={this.state.avatar}
                        large={this.state.avatar}
                        // hideZoom = {true}
                        hideDownload={false}
                        hideZoom={false}
                        onClose={this.closeLightbox}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div className="col-lg-12">
                <span>unknown</span>
              </div>
            );
          }
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage id="manage-user.Gender" defaultMessage="Gender" />
        ),
        selector: (Row) => Row.gender,
        cell: (Row) => {
          const genderItem = genders.find((item) => item.keyMap === Row.gender);
          return (
            <div>
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>
                    {genderItem
                      ? language === LANGUAGES.VI
                        ? genderItem.valueVI
                        : genderItem.valueEN
                      : "Unknown"}
                  </span>
                </div>
              ) : (
                <div>
                  <select
                    className="form-select"
                    // value={this.state.currentGenderItem} // Gán giá trị hiện tại vào select
                    onChange={(e) => {
                      this.onChangeInput(e, "gender");
                    }}
                    value={gender}
                  >
                    {genders.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage
            id="manage-user.Position"
            defaultMessage="Position"
          />
        ),
        width: "250px",
        selector: (Row) => Row.positionId,
        cell: (Row) => {
          const positionIdItem = positions.find(
            (item) => item.keyMap === Row.positionId
          );
          return (
            <div>
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>
                    {positionIdItem
                      ? language === LANGUAGES.VI
                        ? positionIdItem.valueVI
                        : positionIdItem.valueEN
                      : "Unknown"}
                  </span>
                </div>
              ) : (
                <div>
                  <select
                    className="form-select"
                    // value={this.state.currentpositionIdItem} // Gán giá trị hiện tại vào select
                    onChange={(e) => {
                      this.onChangeInput(e, "position"); //position
                    }}
                    value={position}
                  >
                    {positions.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage id="manage-user.Role Id" defaultMessage="Role Id" />
        ),
        selector: (Row) => Row.roleId,
        width: "250px",
        cell: (Row) => {
          const roleIdItem = roleId.find((item) => item.keyMap === Row.roleId);
          return (
            <div>
              {this.state.isEditing[Row.id] !== true ? (
                <div>
                  <span>
                    {roleIdItem
                      ? language === LANGUAGES.VI
                        ? roleIdItem.valueVI
                        : roleIdItem.valueEN
                      : "Unknown"}
                  </span>
                </div>
              ) : (
                <div>
                  <select
                    className="form-select"
                    // value={this.state.currentroleIdItem} // Gán giá trị hiện tại vào select
                    onChange={(e) => {
                      this.onChangeInput(e, "roleid"); //position
                    }}
                    value={roleid}
                  >
                    {roleId.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: (
          <FormattedMessage id="manage-user.Action" defaultMessage="Action" />
        ),
        cell: (Row) => {
          return (
            <div
              className="btn-group d-flex justify-content-center edit-and-delete"
              style={{
                zIndex: 9999,
                // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                right: 0, // Sticky cột ở bên phải
                backgroundColor: "#ffffff",
                minWidth: "120px",
              }}
            >
              {this.state.isEditing[Row.id] !== true ? (
                // edit and delete
                <div>
                  <Button
                    className="btn btn-warning btn-edit"
                    style={{ height: "70%" }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    onClick={() =>
                      this.handleEditUsers(Row, Row.id, Row.dataUrl)
                    }
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                  <Button
                    className="btn btn-danger   btn-delete"
                    style={{ height: "70%", marginLeft: "10px" }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    onClick={() => this.handleDeleteUsers(Row.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              ) : (
                // tick and cancel
                <div className="group-edit-and-delete">
                  <Button
                    className="btn btn-success btn-edit"
                    style={{ height: "70%" }}
                    onClick={() => this.handleUpdatedUsers(Row.id)}
                  >
                    <i className="fa-solid fa-check"></i>{" "}
                  </Button>
                  <Button
                    className="btn btn-danger btn-delete"
                    style={{ height: "70%", marginLeft: "10px" }}
                    onClick={() => this.handleCancelEdit(Row.id)}
                  >
                    <i className="fa-solid fa-x"></i>{" "}
                  </Button>
                </div>
              )}
            </div>
          );
        },
        style: {
          zIndex: 9999,
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          right: 0, // Sticky cột ở bên phải
          backgroundColor: "#ffffff",
          minWidth: "120px",
        },
      },
    ];

    const customStyles = {
      rows: {
        style: {
          marginBottom: "10px", // Khoảng cách giữa các hàng
        },
      },
    };

    let language = this.props.language;

    let genders = this.state.genderArr;
    let roleId = this.state.roleArr;
    let positions = this.state.positionArr;
    let users = this.state.userArr;

    // let userPhoneNumber = this.props

    return (
      <div>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-view-table"}
          size="xl"
          backdrop={false}
          keyboard={false}
        >
          <ModalHeader toggle={this.toggle}>
            {" "}
            <FormattedMessage id="manage-user.view-table" />
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <DataTable
                  columns={columns}
                  data={users}
                  customStyles={customStyles}
                  highlightOnHover
                  striped
                  selectableRows
                  pointerOnHover
                />
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
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
    /// state user
    gotAllUsers: state.admin.AllUsers,
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
    getAllUsers: () => dispatch(action.FetchAllUsers()),
    genDeleteUser: (data) => dispatch(action.FetchDeleteUser(data)),
    UpdateNewUser: (data) => dispatch(action.UpdateUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
