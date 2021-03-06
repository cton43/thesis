import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createNewGroup, fetchAllGroups } from '../../actions/groups';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import {blueGrey700} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';


class CreateGroup extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    const styles = {
      underlineStyle: {
        borderColor: blueGrey700
      },
      floatingLabelStyle: {
        color: blueGrey700,
      },
      floatingLabelFocusStyle: {
        color: blueGrey700,
      },
      labelStyle: {
        textTransform: 'capitalize'
      }
    };
    const submitCreate = (e) => {
      this.props.createNewGroup(e)
      .then(() => {
        this.props.fetchAllGroups();
      });
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container create group">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <form onSubmit={ handleSubmit(submitCreate) }>
                <h5>Create a group based on your dietary interests.</h5>
                <h5 className="choose-topic">You may choose a topic such as "paleo" or "vegetarian"</h5>
                <Field
                  name='name'
                  component={TextField}
                  type='text'
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  floatingLabelText="Name"
                />
                <Field
                  name='description'
                  component={TextField}
                  type='text'
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  floatingLabelText="Description"
                />
                <RaisedButton
                  className="creategroupbutton"
                  backgroundColor="#C6AC8F"
                  labelColor="#E3E7D3"
                  label="Create Group"
                  labelStyle={styles.labelStyle}
                  disabled={submitting}
                  type="submit"
                />
                <p className="error-txt">
                  {this.props.msg}
                </p>
              </form>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );

  }
  
}

CreateGroup = reduxForm({
  form: 'CreateGroup'
})(CreateGroup);

const mapStateToProps = (state) => {
  return {
    msg: state.browse.msg,
    groups: state.browse.allGroups
  }
}

export default connect(mapStateToProps, { createNewGroup, fetchAllGroups })(CreateGroup);
