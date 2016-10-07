import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserGroups } from '../../../actions/groups';
import IndividualGroup from '../../ToolBox/IndividualGroup';


class MyGroups extends Component {

  componentWillMount() {
    this.props.fetchUserGroups();
  }

  render() {
    if(this.props.myGroups.length > 0) {
      const groupsList = this.props.myGroups.map((group, idx) =>
        <IndividualGroup key={idx} group={group} />
      );
      return (
        <div>
          <h1>My Groups</h1>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
              {groupsList}
            </tbody>
          </table>
        </div>
      );
    } else if(this.props.myGroups.length === 0) {
      return (
        <div>
          <h3>You haven't joined any groups.</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading groups...</h3>
        </div>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups.userGroups
  }
}

export default connect(mapStateToProps, { fetchUserGroups })(MyGroups);