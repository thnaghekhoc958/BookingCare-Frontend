import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../containers/lazyLoading';

///
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Facility from './Section/Facility';  // Đảm bảo đúng cách viết hoa
import HomePages from './StyleHomeHeader/HomePages.scss'
import DoctorOfTheWeek from './Section/Doctor';
import Guide from './Section/Guide';
import AboutMe from './Section/AboutMe';
import HomeFooter from './HomeFooter/HomeFooter';

class HOMEPAGE extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
          };      
        return (
            <div>
                <HomeHeader isShowBanner = {true}/>
                <Specialty
                settings = {settings} />
                <Facility settings = {settings}/>
                <DoctorOfTheWeek settings = {settings}/>
                <Guide/>
                <AboutMe/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE);
