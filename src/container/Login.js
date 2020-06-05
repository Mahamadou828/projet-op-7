import React from 'react';
import { Link } from 'react-router-dom';
import { VerifyEmail } from '../function/verifyInput';
import { LogInAction } from '../actions/formAction';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import FieldInput from '../components/FieldInput';

const FieldsType = {
  email: 'email',
  password: 'password',
  remenber: 'remenber',
};

class LogIn extends React.Component {
  handleSubmit = (information) => {
    console.log(information);
  };

  constructor(props) {
    super(props);
    this.email = '';
    this.password = '';
  }

  render() {
    if (typeof this.props.formInfo === 'object') {
      this.email = this.props.formInfo.syncErrors.email;
      this.password = this.props.formInfo.syncErrors.password;
    }
    return (
      <div className="body-form">
        <div className="form form-login">
          <section className="form-header">
            <h1>
              GROUP<i className="logo fas fa-globe"></i>MANIA
            </h1>
            <article className="form-header-link">
              <p>
                No account, you can create one <Link to="/signup">Here</Link>
              </p>
            </article>
          </section>
          <form
            className="form-corps"
            onSubmit={this.props.handleSubmit(this.handleSubmit)}
          >
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
                color: 'primary',
                idfield: 2,
                label: 'Remenber me on this machine',
                class: 'row',
              }}
              id={FieldsType.remenber}
              name={FieldsType.remenber}
              defaultChecked="false"
            />

            <Button
              className="form-corps-button"
              variant="contained"
              type="submit"
            >
              Connect
            </Button>
          </form>
          <p className="text">Or Connect with: </p>
          <div className="row">
            <Button className="toggle-connect">
              <i className="fab fa-google"></i>
            </Button>
            <Button className="toggle-connect">
              <i className="fab fa-slack"></i>
            </Button>
            <Button className="toggle-connect">
              <i className="fab fa-facebook-f"></i>
            </Button>
            <Button className="toggle-connect">
              <i className="fab fa-github"></i>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  LogInAction,
};

function mapStateToProps(state) {
  return {
    formInfo: state.form.LogIn,
  };
}

const validate = (values) => {
  const errors = {
    email: '',
    password: '',
  };
  errors.email = VerifyEmail(values.email);
  if (!values.password) {
    errors.password = 'Require password';
  }
  return errors;
};

const LogInForm = reduxForm({
  form: 'LogIn',
  fields: Object.keys(FieldsType),
  validate: validate,
})(LogIn);

LogIn.propTypes = {
  formInfo: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
