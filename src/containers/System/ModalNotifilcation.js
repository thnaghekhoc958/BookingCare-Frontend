import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManger.scss";


import { emitter } from "../../utils/emitter";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

class ModalNotifilcation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.listenToemitter();
  }

  componentDidMount() {}

  resetUsers =() => {
  emitter.emit('EVENT_CLEAR_MODAL_DATA')
    // this.props.listenToEmitter(this.state)
    this.toggle()
  }
   
  
  toggle = () => {
    this.props.handleResetInputofModal();
  };

  render() {
    console.log('this.prop is', this.props)
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}

        <Modal
          isOpen={this.props.isOpenModal}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-reset-users"}
          size="sm"
        >
          <ModalHeader toggle={this.toggle}>Are you sure want to delete all data to input?</ModalHeader>
          <ModalBody>

          <Button color="primary" onClick={() => this.resetUsers()}>
          {/* <button type="button" className="btn btn-warning" onClick={() => this.handleResetInputofModal()}> */}

              Yes
            </Button>{" "}
            <Button color="secondary" onClick={() => {
              this.toggle();
            }}>
             No
            </Button>

          </ModalBody>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalNotifilcation);
