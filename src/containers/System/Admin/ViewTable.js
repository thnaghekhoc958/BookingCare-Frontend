import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "./styleAdmin/Table.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";


/// fire action
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions";
import { changeLanguageApp } from "../../../store/actions";

// import { emitter } from "../../utils/emitter";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

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
    };
  }

  async componentDidMount() {
    this.props.getGenderStart(); // c1
    this.props.getRoleStart();
    this.props.getPositionStart();
    this.props.getAllUsers();
    // this.props.dispatch(actions.getGenderStart()) //c2
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderStartArr = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender:
          genderStartArr && genderStartArr.length > 0
            ? genderStartArr[0].key
            : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      let roleStartArr = this.props.roles;
      this.setState({
        roleArr: this.props.roles,
        roleid:
          roleStartArr && roleStartArr.length > 0 ? roleStartArr[0].key : "",
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let positionStartArr = this.props.positions;
      this.setState({
        positionArr: this.props.positions,
        position:
          positionStartArr && positionStartArr.length > 0
            ? positionStartArr[0].key
            : "",
      });
    }

    if (prevProps.gotAllUsers !== this.props.gotAllUsers) {
      this.setState({
        userArr: this.props.gotAllUsers,
      });
    }

    // if (prevState.gotAllUsers !== this.props.gotAllUsers){
    //   this.props.getAllUsers();
    // }
  }

  toggle = () => {
    this.props.ModalViewTable();
  };

  //delete
  handleDeleteUsers = (id) => {
    console.log("id is : ", id)
    this.props.genDeleteUser(id);
  }
  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roleId = this.state.roleArr;
    let positions = this.state.positionArr;
    let users = this.state.userArr;

    console.log("this.prop is", this.props);
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-view-table"}
          size="xl"
        >
          <ModalHeader toggle={this.toggle}>
            {" "}
            <FormattedMessage id="manage-user.view-table" />
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                {/* <CustomScrollbars style={{height: '100vh',width: '100%'}}/> */}

                <table className="table table-striped table-view">
                  <thead className="start-table">
                      <th scope="col">STT</th>
                      <th scope="col">Email</th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Full Name" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Phone Number" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Address" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Image" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Gender" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Position" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="manage-user.Role Id" />
                      </th>

                      <th scope="col">Action</th>
                  </thead>
                  <tbody className="body-table">
                    {users &&
                      users.length > 0 &&
                      users.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td>{item.phonenumber}</td>
                            <td>{item.address}</td>
                            <td>
                              <img src={item.image} style={{width: '50px',height: '50px'}} alt="image" />
                            </td>{" "}
                            <td>{item.gender}</td>
                            <td>{item.positionId}</td>
                            <td>{item.roleId}</td>
                            <td className=" edit-and-delete">
                              <Button className="btn btn-warning btn-edit" style={{height: '70%' }}>
                                <i className="fa-solid fa-pencil"></i>
                              </Button>
                              <Button className="btn btn-danger btn-delete" style={{height: '70%' }} onClick={() => this.handleDeleteUsers(item.id)}>
                                <i className="fa-solid fa-trash"></i>
                              </Button>
                            </td>{" "}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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
    genDeleteUser: (data) => dispatch(action.FetchDeleteUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
