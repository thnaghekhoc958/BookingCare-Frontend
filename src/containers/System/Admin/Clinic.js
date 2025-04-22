import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import ClinicStyle from "../ClinicStyle.scss";
import { handleSaveClinic } from "../../../services/userService";

// fireBase
// import * as action from "../../../../store/actions";
// import { LANGUAGES, CommonUtils } from "../../../../utils";
// // import { changeLanguageApp } from "../../../store/actions";
// import { Label } from "reactstrap";
// import { toast } from "react-toastify";
// import { isNullishCoalesce } from "typescript";
import anchor from "markdown-it-anchor";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

import MdEditor from "react-markdown-editor-lite";
const mdParser = new MarkdownIt(/* Markdown-it options */).use(anchor, {
  level: 1, // Mức tiêu đề bắt đầu từ h1
  permalink: anchor.permalink.linkInsideHeader({
    symbol: "#", // Biểu tượng hiển thị để nhấp vào
    placement: "before", // Vị trí biểu tượng (#) trước tiêu đề
  }),
});

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      description: "",
      address: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    // console.log("data files is : ",file)
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState(
        {
          previewImg: objectUrl,
          imageBase64: base64,
        },
        () => {
          console.log("copyState: ", this.state.avatar); // Đặt console.log trong callback của setState
        }
      );
    } else {
      alert("Image not found!");
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("this.state: ", this.state);
      }
    );
  };

  checkValidateInput = () => {
    let arrCheck = [
      "name",
      "imageBase64",
      "descriptionHTML",
      "descriptionMarkdown",
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

  handleSaveNewSpeciality = async () => {
    let isChecked = this.checkValidateInput();
    if (!isChecked) return;
    try {
      let res = await handleSaveClinic({
        name: this.state.name,
        image: this.state.imageBase64,
        description: this.state.description,
        address: this.state.address,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      if (res && res.errcode === 0) {
        toast.success("Save Content data Success!!");
      
      } else {
        toast.error("Save failed. Please try again!!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error from server");
    }
  };

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <React.Fragment>
        <div className="manage-specialty-container container">
          <div className="ms-title">Quản Lý Phòng Khám</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label className="specialty-name">Tên Phòng Khám</label>
              <input
                className="form-control"
                value={this.state.name}
                onChange={(event) => this.onChangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
              <label className="specialty-name">ảnh Phòng Khám</label>
              <input
                className="form-control"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
            </div>
          </div>
          <div class="col-12 form-group">
            <label>Mô tả</label>
            <textarea
              id="description"
              class="form-control"
              rows="10"
              value={this.state.description}
              onChange={(event) => this.onChangeInput(event, "description")}

            ></textarea>
          </div>
          <div className="col-12 form-group">
            <label className="specialty-name">Địa Chỉ Phòng khám</label>
            <input
              className="form-control"
              value={this.state.address}
              onChange={(event) => this.onChangeInput(event, "address")}
            />
          </div>
          <div className="manage-doctor-editor">
            {/* MdEditor style={{ height: '500px' }} 
        renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} */}
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ html, text }) =>
                this.handleEditorChange({ html, text })
              }
              // ref={this.mdEditorRef} // Gán ref cho editor
              value={this.state.contentMarkdown}
            />
          </div>
          <div className="col-12 button-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleSaveNewSpeciality()}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    ScheduleDoctors: state.admin.scheduleTimeofDoctors,
    addInforDoctor: state.admin.addInforDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
