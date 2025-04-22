import React, { Component, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManger.scss";
import ModalUser from "./ModalUser";
import { getAllUsers,CreateNewUserFromService,getDeleteUser,getEditData } from "../../services/userService";
import { Button } from "reactstrap";
import ModalEdit from './ModalEdit'
import { emitter } from "../../utils/emitter";
import UserManger from "./UserManger.scss"



import { assign, bind } from "lodash";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      arrUsersEdit: [],
      isOpenModalUser: false,
      isOpenModalEdit: false,
      // modal : true
      // isOpenModalUser: false, // Quản lý trạng thái mở/đóng modal
    };
  }

  EditUser = async(data) => {
    // console.log('data of editusers is: ',data)
    let response = await getEditData(data);
    emitter.emit('EVENT_CLEAR_MODAL_DATA')

    if (response.errcode == 0) {
      alert(response.message)
      await this.componentDidMount();
    } else {
      alert(response.message)
    }
  }
  
  handleEditData = async(data) => {
    let response = await getAllUsers(data);
    if (response && response.errCode == 0) {
      this.setState({
        isOpenModalEdit: !this.state.isOpenModalEdit,
        arrUsersEdit: response.users,
      })
      // console.log('arrUsersEdit',this.state.arrUsersEdit)
      // let arrUsers = this.state.arrUsers
      // console.log(arrUsers)
    } else {
      alert(response.errMessage)
    }

  }

  handleDeleteData = async(data) => {
    let response = await getDeleteUser(data);
    if (response.message.errcode == 0) {
      this.componentDidMount()
      alert(response.message.message)

    } else {
      alert(response.message.message)
    }
  }

  

  handleNewUser = () => {
    this.setState({
      isOpenModalUser: true,

    })
  };

  createNewUser= async(data) => {
    let response = await CreateNewUserFromService(data);
    this.toggleUserModal()
    emitter.emit('EVENT_CLEAR_MODAL_DATA')
    if (response.errcode == 0) {
      alert(response.message)
      this.componentDidMount()
    } else {
      alert(response.errcode)
    }
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,

    })
  }
  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrUsers: response.users,
      });

      // console.log('check state user 1', this.state.arrUsers);
    }
    // console.log(response);
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="container-fluid">
        { this.state.isOpenModalEdit &&
        <ModalEdit 
          isOpenModalEdit = {this.state.isOpenModalEdit}
          handleEditData = {this.handleEditData}
          arrUsersEdit = {this.state.arrUsersEdit}
          EditUser = {this.EditUser}

        />
        }
        <div className="text-center">
          <h2>Edit Users</h2>
        </div>

        <div className="mx-1">
          <ModalUser isOpen={this.state.isOpenModalUser}
           toggleFromParent={this.toggleUserModal} 
           createNewUser={this.createNewUser}
           />

          <Button
            className="btn btn-primary px-5"
            color="primary"
            onClick={() => this.handleNewUser()} // Gọi hàm toggle để mở modal
          >
            <i className="fa-solid fa-user-plus"></i>
          </Button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th scope="col">Gender</th>
                <th scope="col">Role ID</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item) => {
                  // console.log("check map", item);
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.address}</td>
                      <td>{item.gender}</td>
                      <td>{item.roleId}</td>
                      <td>
                        <Button className="btn-edit" onClick={()=> this.handleEditData(item.id)}>
                          <i className="fa-solid fa-pencil"></i>
                        </Button>
                        <Button className="btn-delete"onClick={()=>this.handleDeleteData(item.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
// export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
