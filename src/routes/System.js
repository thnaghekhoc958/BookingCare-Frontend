import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import mangeDoctor from "../containers/System/Admin/mangeDoctor";
// import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Header";
// const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

 import manageSpecialty from "../containers/System/Admin/Specialty/manageSpecialty";
 import Clinic from "../containers/System/Admin/Clinic"
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manger-doctor" component={mangeDoctor} />
              <Route path="/system/manage-specialty" component={manageSpecialty}/>
              <Route path= "/system/manage-clinic" component={Clinic}/>
              {/* <Route
                path="/system/register-package-group-or-account"
                component={RegisterPackageGroupOrAcc}
              /> */}
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
