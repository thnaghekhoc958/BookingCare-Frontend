import React, { Component } from "react";
import { connect } from "react-redux";
import CustomScrollbars from "../../../components/CustomScrollbars";
import { getDetailDoctor } from "../../../services/userService";
import "./styleAdmin/mangeDoctor.scss";
/// fire action
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions";
import { changeLanguageApp } from "../../../store/actions";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import Select from "react-select";
import MarkdownIt from "markdown-it";

import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import anchor from "markdown-it-anchor";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */).use(anchor, {
  level: 1, // Mức tiêu đề bắt đầu từ h1
  permalink: anchor.permalink.linkInsideHeader({
    symbol: "#", // Biểu tượng hiển thị để nhấp vào
    placement: "before", // Vị trí biểu tượng (#) trước tiêu đề
  }),
});

class mangeDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to content MarkDown table
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      haveArrDoctors: [],

      SelectedDoctor: "",
      listDoctors: "",
      arrcontentDoctor: "",
      // action:"",
      hasOldData: false,

      // save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      // value seclected
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      // stroage local
      listObject: null,
    };
    // this.mdEditorRef = React.createRef();
  }

  async componentDidMount() {
    this.props.GetAllDoctors();
    this.props.handleFindDoctor();
    this.props.getRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gotALLDoctors !== this.props.gotALLDoctors) {
      // haveArrDoctors
      let DataSelect = this.buildDataInputSelect(
        this.props.gotALLDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: DataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let DataSelect = this.buildDataInputSelect(
        this.props.gotALLDoctors,
        "USERS"
      );
      let { listObject, SelectedDoctor } = this.state;
      let { resPayment, resPrice, resProvince } = this.props.allInfor;
      let DataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let DataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let DataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      if (listObject) {
        let { provinceId, priceId, paymentId } = listObject;
        let selectedPrice = DataSelectPrice.find((item) => {
          return item && item.value === priceId;
        });
        let selectedPayment = DataSelectPayment.find((item) => {
          return item && item.value === paymentId;
        });
        let selectedProvince = DataSelectProvince.find((item) => {
          return item && item.value === provinceId;
        });
        this.setState({
          listDoctors: DataSelect,

          listPrice: DataSelectPrice,
          listPayment: DataSelectPayment,
          listProvince: DataSelectProvince,

          selectedPrice: selectedPrice,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
        });
      } else {
        this.setState({
          listDoctors: DataSelect,

          listPrice: DataSelectPrice,
          listPayment: DataSelectPayment,
          listProvince: DataSelectProvince,

          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
        });
      }

      // if (SelectedDoctor){
      //   const name = { name: "SelectedDoctor" };
      //   this.handleChange(SelectedDoctor,name);
      // }else{
      //   toast.error("error not choose Doctor!!!")
      // }
    }
    if (prevProps.contentDoctor !== this.props.contentDoctor) {
      if (this.state.SelectedDoctor) {
        let doctorContent = this.props.contentDoctor.find(
          (item) => item.doctorId === this.state.SelectedDoctor.value
        );
        if (doctorContent) {
          this.setState({
            hasOldData: true,
          });
        }
      }
      this.setState({
        arrcontentDoctor: this.props.contentDoctor,
      });
    }
    if (prevProps.allInfor !== this.props.allInfor) {
      let { resPayment, resPrice, resProvince } = this.props.allInfor;

      let DataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let DataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let DataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );

      this.setState({
        listPrice: DataSelectPrice,
        listPayment: DataSelectPayment,
        listProvince: DataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
  };
  handleSaveContentMarkDown = () => {
    let { hasOldData } = this.state;
    this.props.SaveDetailDoctor({
      id: this.state.SelectedDoctor.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.SelectedDoctor.value,

      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvince: this.state.selectedProvince,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };
  handleResetInputDoctor = () => {
    const userConfirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (userConfirmed) {
      this.handleActionYes();
    } else {
    }
  };

  handleActionYes = (SelectedDoctor) => {
    let DataSelect = this.buildDataInputSelect(
      this.props.gotALLDoctors,
      "USERS"
    );
    this.setState({
      SelectedDoctor,
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      listDoctors: DataSelect,

      addressClinic: "",
      nameClinic: "",
      note: "",

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
    });
  };
  handleChange = async (Selected, name) => {
    //getDetailDoctor
    let DataSelect = this.buildDataInputSelect(
      this.props.gotALLDoctors,
      "USERS"
    );
    let typeName = name.name;
    this.handleActionYes(Selected);
    let copyState = { ...this.state };
    copyState[typeName] = Selected;
    if (typeName === "SelectedDoctor") {
      let res = await getDetailDoctor(copyState[typeName].value);
      let ObjectMarkDownOfDoctor = res.data.MarkDownObject;
      if (res && res.errcode === 0 && res.data && res.data.MarkDownObject) {
        let listObject = res.data.Doctor_Infor;
        if (listObject) {
          let {
            addressClinic,
            nameClinic,
            note,
            provinceId,
            priceId,
            paymentId,
          } = listObject;
          let { listPrice, listPayment, listProvince } = this.state;
          let { language } = this.props;
          let selectedPrice = "",
            selectedPayment = "",
            selectedProvince = "";
          selectedPrice = listPrice.find((item) => {
            return item && item.value === priceId;
          });
          selectedPayment = listPayment.find((item) => {
            return item && item.value === paymentId;
          });
          selectedProvince = listProvince.find((item) => {
            return item && item.value === provinceId;
          });
          this.setState({
            Selected,
            contentHTML: ObjectMarkDownOfDoctor.contentHTML,
            contentMarkdown: ObjectMarkDownOfDoctor.contentMarkdown,
            description: ObjectMarkDownOfDoctor.description,

            addressClinic: addressClinic,
            nameClinic: nameClinic,
            note: note,

            selectedPrice: selectedPrice,
            selectedPayment: selectedPayment,
            selectedProvince: selectedProvince,

            listObject: listObject,
            hasOldData: true,
          });
        } else {
          this.setState({
            Selected,
            contentHTML: ObjectMarkDownOfDoctor.contentHTML,
            contentMarkdown: ObjectMarkDownOfDoctor.contentMarkdown,
            description: ObjectMarkDownOfDoctor.description,

            addressClinic: "",
            nameClinic: "",
            note: "",

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",

            listObject: null,
            hasOldData: false,
          });
        }
      } 
    }
    if (
      typeName === "selectedPrice" ||
      typeName === "selectedProvince" ||
      typeName === "selectedProvince" ||
      typeName === "selectedPayment"
    ) {
      // priceId = '', provinceId = '', paymentId = '' ;
      // let priceId
      this.setState({
        ...copyState,
      });
    }
  };
  handleOnChangeText = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        if (type === "USERS") {
          let objectData = {};

          let TranFormeName = this.reverseName(item.name);
          let labelVi = `${item.name}`;
          let labelEn = `${TranFormeName}`;
          objectData.label = language === LANGUAGES.VI ? labelVi : labelEn;

          objectData.value = item.id;
          result.push(objectData);
        }
        if (type === "PRICE" || type === "PAYMENT" || type === "PROVINCE") {
          let objectData = {};
          let labelVi =
            type === "PRICE" ? `${item.valueVI} VNĐ` : `${item.valueVI}`;
          let labelEn =
            type === "PRICE" ? `${item.valueEN} USD` : `${item.valueEN}`;
          objectData.label = language === LANGUAGES.VI ? labelVi : labelEn;
          objectData.value = item.keyMap;
          // result.push({ ...objectData });
          result.push(objectData);
        }
      });
    }
    return result;
  };
  removeVietnameseTones = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Bỏ dấu tiếng Việt
  };
  // Hàm đảo ngược tên
  reverseName = (name) => {
    const nameParts = name.split(" ").reverse(); // Tách họ tên và đảo ngược thứ tự
    const reversedName = nameParts.join(" "); // Ghép lại thành chuỗi
    return this.removeVietnameseTones(reversedName); // Bỏ dấu
  };

  //css select

  render() {
    console.log(this.props);
    console.log("this.state.arrcontentDoctor", this.state.arrcontentDoctor);
    let {
      listPrice,
      listPayment,
      listProvince,
      selectedPrice,
      selectedPayment,
      selectedProvince,
    } = this.state;
    const formatOptionLabel = ({ value, label, customAbbreviation }) => {
      let iscontent = this.state.arrcontentDoctor;
      let a = iscontent.find((item1) => item1.doctorId === value);
      // let a = this.state.hasOldData;
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{label}</div>
          {/* <div style={{ marginLeft: "10px", color: "#25e51a" }}>
            {customAbbreviation}
          </div> */}
          <div>{a ? "✔️" : "❌"}</div>
        </div>
      );
    };
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="Doctor.content-doctor.createContentOfDoctor" />
        </div>
        <div className="more-infor">
          <div className="w-100 content-left">
            <label>
              <h2>
                <FormattedMessage id="Doctor.content-doctor.introductionInformation" />
              </h2>
            </label>
            <textarea
              className="form-control "
              rows="4"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
          <div className="content-right">
            <label>
              <h2>
                <FormattedMessage id="Doctor.content-doctor.ChooseDoctor" />
              </h2>
            </label>
            <Select
              value={this.state.SelectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              formatOptionLabel={formatOptionLabel}
              name="SelectedDoctor"
              className="form-group col-md-12"
              placeholder="Choose Doctor"
            />
          </div>
        </div>
        {/* // */}
        <div className="form-group-container">
          {/* Placeholder for new fields */}
          <div className="form-group">
            <label htmlFor="priceId">
              {" "}
              <FormattedMessage id="Doctor.content-doctor.Price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              defaultInputValue={this.state.selectedPrice}
              onChange={this.handleChange}
              options={this.state.listPrice}
              name="selectedPrice"
              className="form-group "
              placeholder="Choose Price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="provinceId">
              <FormattedMessage id="Doctor.content-doctor.Province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChange}
              options={this.state.listProvince}
              name="selectedProvince"
              className="form-group "
              placeholder="Choose Province"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentId">
              <FormattedMessage id="Doctor.content-doctor.Payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChange}
              options={this.state.listPayment}
              name="selectedPayment"
              className="form-group "
              placeholder="Choose PayMent"
            />
          </div>

          <div className="form-group">
            <label>
              <FormattedMessage id="Doctor.content-doctor.AddressClinic" />
            </label>
            <input
              type="text"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          {/* nameClinic: "",
      addressClinic: "",
      note: "", */}
          <div className="form-group">
            <label>
              <FormattedMessage id="Doctor.content-doctor.ClinicName" />
            </label>
            <input
              type="text"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>

          <div className="form-group">
            <label>
              <FormattedMessage id="Doctor.content-doctor.Note" />
            </label>
            <textarea
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            ></textarea>
          </div>
        </div>
        {/* // */}

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
        <div className="action-button">
          <div className="group-row">
            <Button
              //hasOldData
              // className=  "btn btn-success save-content-doctor"
              className={
                hasOldData === true
                  ? "btn btn-primary edit-content-doctor"
                  : "btn btn-success save-content-doctor"
              }
              onClick={() => this.handleSaveContentMarkDown()}
            >
              {hasOldData == true ? (
                <i className="fa-sharp fa-solid fa-screwdriver-wrench fa-fw"></i>
              ) : (
                <i className="fa-solid fa-floppy-disk fa-fw image-icon-save"></i>
              )}
              {/* <i class="fa-sharp fa-solid fa-screwdriver-wrench fa-fw"></i> */}
              {/* <i className="fa-solid fa-floppy-disk fa-fw image-icon-save"></i> */}
            </Button>
            <Button
              className="btn btn-warning btn save-content-doctor"
              onClick={() => this.handleResetInputDoctor()}
            >
              <i className="fa-sharp fa-solid fa-arrow-rotate-right fa-fw"></i>
            </Button>
          </div>
        </div>
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
    //all doctors
    gotALLDoctors: state.admin.AllDoctors,
    // content doctors
    contentDoctor: state.admin.contentDoctor,
    // all infor inside doctor
    allInfor: state.admin.allResquiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    ///
    GetAllDoctors: () => dispatch(action.fetchAllDoctor()),
    SaveDetailDoctor: (data) => dispatch(action.SaveObjectDoctor(data)),
    handleFindDoctor: () => dispatch(action.handleFindDoctor()),

    // save to doctor_infor table
    getRequiredDoctorInfor: () => dispatch(action.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mangeDoctor);
