import React, { Component, Fragment,lazy } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer,Bounce  } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from '../routes/Login';
import Login from "../containers/Auth/login";
// import Header from './Header/Header';
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HOMEPAGE from "./HomePage/HOMEPAGE";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import ScheduleMedicalAppointment from "./Patient/Doctor/Booking/ScheduleMedicalAppointment";
import VerifyEmail from "./Patient/VerifyEmail"
import CustomScrollbars from "../components/CustomScrollbars";
import SmartMedicalExamination from './HeaderFunction/SmartMedicalExamination'
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={path.HOMEPAGE} component={HOMEPAGE} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/> 
                  <Route path={'/doctor/'} component={Doctor}/> 
                  <Route path={path.SCHEDULE_APPOINTMENT} component={ScheduleMedicalAppointment}/> 
                  <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail}/> 
                  <Route path={'/smart-medical-examination'} component={SmartMedicalExamination}/> 
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
            // className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
            // autoClose={false} hideProgressBar={true} pauseOnHover={false}
            // pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
            // closeButton={<CustomToastCloseButton />}
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition = {Bounce}
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
