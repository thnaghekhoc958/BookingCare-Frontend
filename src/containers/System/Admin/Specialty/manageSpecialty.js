import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Đảm bảo đã import ngôn ngữ tiếng Việt
import Flatpickr from "react-flatpickr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import manageSpecialty from './manageSpecialty.scss'
import { isStatusVerify } from "../../../../store/actions";

import MarkdownIt from "markdown-it";

import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS,CommonUtils } from "../../../../utils";
import anchor from "markdown-it-anchor";
import { toast } from "react-toastify";

import * as action from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
import { handleSaveSpecialty } from "../../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */).use(anchor, {
  level: 1, // Mức tiêu đề bắt đầu từ h1
  permalink: anchor.permalink.linkInsideHeader({
    symbol: "#", // Biểu tượng hiển thị để nhấp vào
    placement: "before", // Vị trí biểu tượng (#) trước tiêu đề
  }),
});

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
        descriptionHTML: html,
        descriptionMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
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

  onChangeInput =(event, id) => {
    let copyState = {...this.state};
    copyState[id] = event.target.value;
    this.setState({
        ...copyState
    },() => {
        console.log('this.state: ',this.state)
    })
  }

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

  // handleSaveNewSpeciality =async () => {
  //   let isChecked = this.checkValidateInput();
  //   if (isChecked === false) return;
  //  let data = this.props.handleSavedata({
  //     name: this.state.name,
  //     image: this.state.imageBase64,
  //     descriptionHTML: this.state.descriptionHTML,
  //     descriptionMarkdown: this.state.descriptionMarkdown,
  //   })
  //   console.log(data)
  //   try {
  //     let res = await handleSaveSpecialty(data)
  //     if (res && res.errcode == 0) {
  //       toast.success("Save Content data Success!!")
  //     } else {
  //       toast.error("save failed. Plsease try again!!")
  //     }
  //   }catch(e){
  //     console.log(e);
  //     toast.error("error from server")
  //   }
  // }

  handleSaveNewSpeciality = async () => {
    let isChecked = this.checkValidateInput();
    if (!isChecked) return;
    try {
      let res = await handleSaveSpecialty({
        name: this.state.name,
        image: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      if (res && res.errcode === 0) {
        toast.success("Save Content data Success!!");
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        })
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
    let { statusVerify, errcode } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="manage-specialty-container container">
          <div className="ms-title">Quản Lý Chuyên Khoa</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label className="specialty-name">Tên Chuyên Khoa</label>
              <input className="form-control" value={this.state.name} onChange={(event) => this.onChangeInput(event,'name')}/>
            </div>
            <div className="col-6 form-group">
              <label className="specialty-name">ảnh Chuyên Khoa</label>
              <input className="form-control" type="file" onChange={(event) => this.handleOnchangeImage(event)}/>
            </div>
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
              <button type="button" className="btn btn-primary" onClick={() => this.handleSaveNewSpeciality()}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    //
    thisIsInforDoctor: state.admin.detailDoctor,
    addInforDoctor: state.admin.addInforDoctor,
    ScheduleDoctors: state.admin.scheduleTimeofDoctors,
    //
    appointmentDoctor: state.admin.appointmentDoctor,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
