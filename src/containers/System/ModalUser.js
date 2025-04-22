import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CssModalUser.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import ModalNotifilcation from "./ModalNotifilcation";

import e from "cors";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phonenumber: "",
      address: "",
      isOpenModal: false,
    };
    this.listenToEmitter();
  }

  handleResetInputofModal = () => {
    // emitter.emit('EVENT_CLEAR_MODAL_DATA')
    // emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id' : 'your id'})

    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        address: "",
      });
    });
  }

  componentDidMount() {
    // console.log("mouting modal");
  }

  toggle = () => {
    this.props.toggleFromParent();
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

  handleAddNewUser = () => {
    let isValid = this.checkValidate();
    if (isValid) {
      this.props.createNewUser(this.state);

      // console.log('props of create new user: ' + this.props.createNewUser());
      // console.log(this.state)
    }
  };

  handleOnChangeInput = (e, id) => {
    // c1 //
    // const {name,value} = e.target;
    // this.setState({
    //   [name]:value,
    // })
    //  console.log('${name}: ${value}');
    // console.log(e.target)

    // c2 don't use this way because it bad your code! //
    // this.state[id] = e.target.value;
    // this.setState({
    //   ...this.state
    // }, () => {
    //   console.log('check bad site ', this.state)
    // })

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
  render() {
    // console.log("check child props", this.props);
    // console.log('check child isopen open modals',this.props.isOpen)

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-create-users"}
        size="lg"
        // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create New Users
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
          <div className="text-end btn-reset">
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
          </div>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Save Changes
          </Button>{" "}
          <Button
            className="px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
