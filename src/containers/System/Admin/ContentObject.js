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

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class ContentObject extends Component {
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
  }

  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roleId = this.state.roleArr;
    let positions = this.state.positionArr;
    let users = this.state.userArr;

    return (
      <React.Fragment>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
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
    genDeleteUser: (data) => dispatch(action.FetchDeleteUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentObject);
