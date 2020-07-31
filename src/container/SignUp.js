import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import SignUpAction from '../actions/SignUpAction';
import LoaderAction from '../actions/LoaderAction';
import {
  VerifyPasswordStrenght,
  VerifyEmail,
  VerifyText,
  VerifyFile,
} from '../function/verifyInput';
import FieldInput from '../components/FieldInput';
import Loader from '../components/Loader';
import GetSessionAction from '../actions/GetSessionAction';

const FieldsType = {
  email: 'email',
  password: 'password',
  description: 'description',
  name: 'name',
  surname: 'surname',
  avatar: 'avatar',
  remenber: 'remenber',
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.name = '';
    this.surname = '';
    this.avatar = '';
    this.email = '';
    this.password = '';
  }

  handleSubmit = (information) => {
    this.props.LoaderAction(3, true);
    if (typeof information.description === 'undefined') {
      information.description = '';
    }
    this.props.SignUpAction(information);
  };

  componentDidMount() {
    this.props.GetSessionAction();
  }

  render() {
    if (typeof this.props.formInfo === 'object') {
      this.name = this.props.formInfo.syncErrors.name;
      this.surname = this.props.formInfo.syncErrors.surname;
      this.avatar = this.props.formInfo.syncErrors.avatar;
      this.email = this.props.formInfo.syncErrors.email;
      this.password = this.props.formInfo.syncErrors.password;
    }

    return (
      <div className="body-form">
        <div className="form form-signup">
          <section className="form-header">
            <h1>
              GROUP<i className="logo fas fa-globe"></i>MANIA
            </h1>
            <article className="form-header-link">
              <p>
                Have a accout <Link to="/">Log here</Link>
              </p>
            </article>
          </section>

          <form
            className="form-corps"
            onSubmit={this.props.handleSubmit(this.handleSubmit)}
          >
            <Field
              id={FieldsType.name}
              name={FieldsType.name}
              component={FieldInput}
              props={{
                label: 'Enter your name',
                idfield: 1,
                type: 'text',
                class: 'row',
                error: this.name,
              }}
              type="text"
            />

            <Field
              id={FieldsType.surname}
              name={FieldsType.surname}
              component={FieldInput}
              props={{
                label: 'Enter your surname',
                idfield: 1,
                type: 'text',
                class: 'row',
                error: this.surname,
              }}
              type="text"
            />

            <Field
              component={FieldInput}
              id={FieldsType.email}
              name={FieldsType.email}
              props={{
                label: 'Enter your email',
                idfield: 1,
                type: 'email',
                class: 'row',
                error: this.email,
              }}
              type="text"
            />

            <Field
              component={FieldInput}
              props={{
                label: 'Enter your password',
                idfield: 1,
                type: 'password',
                class: 'row',
                error: this.password,
              }}
              id={FieldsType.password}
              name={FieldsType.password}
            />

            <Field
              component={FieldInput}
              props={{
                label: 'Enter a short description of you',
                idfield: 3,
                class: 'row',
              }}
              id={FieldsType.description}
              name={FieldsType.description}
            />

            <Field
              name={FieldsType.avatar}
              props={{
                label: 'Upload your avatar',
                required: true,
                idInput: FieldsType.avatar,
                acceptList: ['jpg', 'bmp', 'png', 'jpeg'],
                class: 'file',
                idfield: 4,
                error: this.avatar,
              }}
              type="file"
              component={FieldInput}
            />

            <Field
              component={FieldInput}
              props={{
                color: 'primary',
                idfield: 2,
                label: 'Remenber me on this machine',
                class: 'row',
              }}
              id={FieldsType.remenber}
              name={FieldsType.remenber}
              defaultChecked="false"
            />
            <Button className="form-corps-button" type="submit">
              Submit
            </Button>
            <Loader />
          </form>
        </div>
        {this.props.access ? <Redirect to="/home" /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  SignUpAction,
  GetSessionAction,
  LoaderAction,
};

function mapStateToProps(state) {
  return {
    formInfo: state.form.SignUp,
    access: state.Access.access,
  };
}

const validate = (values) => {
  const errors = {
    email: '',
    password: '',
    name: '',
    surname: '',
    avatar: '',
  };

  const validationCriteriaFile = {
    extensionList: ['jpg', 'gif', 'bmp', 'png'],
    size: '2000000',
  };

  errors.email = VerifyEmail(values.email);
  errors.password = VerifyPasswordStrenght(values.password);
  errors.surname = VerifyText(values.surname, 'surname Required');
  errors.name = VerifyText(values.name, 'name Required');
  errors.avatar = VerifyFile(values.avatar, validationCriteriaFile);

  return errors;
};

const SignUpForm = reduxForm({
  form: 'SignUp',
  fields: Object.keys(FieldsType),
  validate: validate,
})(SignUp);

SignUp.propTypes = {
  formInfo: PropTypes.object,
  handleSubmit: PropTypes.func,
  SignUpAction: PropTypes.func,
  access: PropTypes.bool,
  LoaderAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
