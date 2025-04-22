import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import ModalNotifilcation from "./ModalNotifilcation";
import _ from "lodash";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phonenumber: "",
      address: "",
    };
    this.listenToEmitter();
  }

  componentDidMount() {
    let user = this.props.arrUsersEdit;
    // let {arrUsersEdit} = this.props
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        name: user.name,
        password: "hash a password",
        phonenumber: user.phonenumber,
        address: user.address,
      });
    }
    // console.log('this props arrUsersEdit is: ',this.props.arrUsersEdit)
  }

  handleResetInputofModal = () => {
    // emitter.emit('EVENT_CLEAR_MODAL_DATA')
    // emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id' : 'your id'})

    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  checkValidate = () => {
    let isTrueValidate = true;
    let arrInput = ["email", "name", "password", "phonenumber", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isTrueValidate = true;
        alert("Notification!, you have not entered a " + arrInput[i]);
        break;
      }
    }
    return isTrueValidate;
  };

  handleSaveUsers = () => {
    let isValid = this.checkValidate();
    if (isValid) {
      this.props.EditUser(this.state);

      // console.log('props of create new user: ' + this.props.createNewUser());
    }
  };

  handleOnChangeInput = (e, id) => {
    // c3 good write code! //
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    // console.log('copysate is: ',copyState[id]);
    // console.log('e.target.value is: ',e.target.value);
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log("check bad site: ", this.state);
      }
    );
    // console.log("event_2", e.target.value, id);
  };

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      let user = this.props.arrUsersEdit;
      // let {arrUsersEdit} = this.props
      if (user && !_.isEmpty(user)) {
        this.setState({
          id: user.id,
          email: user.email,
          name: user.name,
          password: "hash a password",
          phonenumber: user.phonenumber,
          address: user.address,
        });
      }
    });
  }

  toggle = () => {
    this.props.handleEditData();
  };

  render() {
    return (
      <div className="edit-data-center">
        {" "}
        <Modal
          isOpen={this.props.isOpenModalEdit}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-user-create-users"}
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Table Edit User
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "email");
                  }}
                  disabled
                />
              </div>
              <div className="input-container ">
                <label>Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "name");
                  }}
                />
              </div>
              <div className="input-container">
                <label>PassWord</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "password");
                  }}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>PhoneNumber</label>
                <input
                  type="Number"
                  value={this.state.phonenumber}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "phonenumber");
                  }}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "address");
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="btn-btn-btn">
              <ModalNotifilcation
                isOpenModal={this.state.isOpenModal}
                handleResetInputofModal={this.handleResetInputofModal}
              />
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.handleResetInputofModal()}
              >
                Reset
              </button>
              <Button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleSaveUsers()}
              >
                Save Changes
              </Button>{" "}
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.toggle();
                }}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
