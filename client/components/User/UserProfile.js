import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserData, leavePage } from '../../actions/users';
import NavBar from '../ToolBox/NavBar';
import ProfilePic from '../ToolBox/ProfilePic';
import RadarGraph from '../ToolBox/RadarGraph';
import MacroTable from '../ToolBox/MacroTable';
import Tabs from '../ToolBox/Tabs';
import UpdateUserData from './Edit/UpdateUserData';
import Cookies from 'js-cookie';


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editFlag: false
    }
    this.toggleEditing.bind(this);
  }

  componentWillMount() {
    Cookies.set('currentProfileID', Cookies.get('userID'));
    this.props.fetchUserData();
  }

  componentDidUpdate() {
  }

  toggleEditing() {
    this.setState({
      editFlag: !this.state.editFlag
    });
  }

  componentWillUnmount() {
    Cookies.remove('currentProfileID');
    this.props.leavePage();
  }

  render() {

    if(this.props.userProfile.userData !== null) {

      if(!this.state.editFlag) {

        const tabsList = [
          { label: 'Food Diary', component: 'FoodDiary' },
          { label: 'My Friends', component: 'MyFriends' },
          { label: 'My Groups', component: 'MyGroups' }
        ];

        return (
          <div>
            <NavBar />
            <div className="user-container all-container">
              <div className="user-row">
                <div className="col-lg-4 user-profile-block-left">
                  <div>
                    <ProfilePic userID={Cookies.get('userID')} />
                  </div>
                  <div className="user-info">
                    <ul className="list-group">
                      <li className="user-info-list-item">
                        <strong>{this.props.userProfile.username}</strong>
                      </li>
                      <li className="user-info-list-item">
                        Age: {this.props.userProfile.userData.age}
                      </li>
                      <li className="user-info-list-item">
                        Gender: {this.props.userProfile.userData.gender}
                      </li>
                      <li className="user-info-list-item">
                        Height: {Math.floor(this.props.userProfile.userData.height/12)}ft {this.props.userProfile.userData.height%12}in
                      </li>
                      <li className="user-info-list-item">
                        Weight: {this.props.userProfile.userData.weight}
                      </li>
                    </ul>
                    <div>
                      <button className="edit-info-btn btn btn-secondary" type="button" onClick={() => this.toggleEditing()}>
                        Edit Info
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 user-profile-block-center">
                  <RadarGraph type={'amount'} size={'large'} />
                </div>
                <div className="col-lg-4 user-profile-block-right">
                  <MacroTable idealMacros={this.props.userProfile.idealMacros} actualMacros={this.props.userProfile.actualMacros} />
                  <p className="disclaimer">*all nutrient recommendations are USDA and RDA-based dietary reference intakes*</p>
                </div>
              </div>
              <div className="clear-floats user-tabs">
                <Tabs tabsList={tabsList} />
              </div>
            </div>
          </div>
        );

      } else {

        return (
          <div>
            <NavBar />
            <h3 className="all-container">
            </h3>
            <UpdateUserData />
            <button className="returnToProfile-btn btn btn-secondary" type="button" onClick={() => this.toggleEditing()}>
              Return to Profile
            </button>
          </div>
        );

      }

    } else {

      return (
        <div>
          <NavBar />
          <h3 className="all-container">
            Loading your profile...
          </h3>
        </div>
      );

    }

  }

}

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile
  }
}

export default connect(mapStateToProps, { fetchUserData, leavePage })(UserProfile);
