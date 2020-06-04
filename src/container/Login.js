import React from 'react';
import { Link } from 'react-router-dom';
import { VerifyEmail } from '../function/verifyInput';
import { LogInAction } from '../actions/formAction';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Checkbox, Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const FieldsType = {
  email: 'email',
  password: 'password',
  remenber: 'remenber',
};

class LogIn extends React.Component {
  handleSubmit = (information) => {
    console.log(information);
  };

  renderFormFields = (props) => {
    switch (props.idfield) {
      case 1:
        return (
          <TextField {...props.input} label={props.label} type={props.type} />
        );
      case 2:
        return <Checkbox {...props.input} color={props.color} />;
      default:
        return <TextField {...props.input} />;
    }
  };

  render() {
    return (
      <div className="body-form">
        <div className="form">
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
              component={this.renderFormFields}
              id={FieldsType.email}
              name={FieldsType.email}
              props={{
                label: 'Enter your email',
                idfield: 1,
                type: 'email',
              }}
              type="text"
            />
            <Field
              component={this.renderFormFields}
              props={{
                label: 'Enter your password',
                idfield: 1,
                type: 'password',
              }}
              id={FieldsType.password}
              name={FieldsType.password}
            />
            <div className="row">
              <Field
                component={this.renderFormFields}
                props={{ color: 'primary', idfield: 2 }}
                id={FieldsType.remenber}
                name={FieldsType.remenber}
                defaultChecked="false"
              />
              <label className="label">Remenber Me on this Machine</label>
            </div>

            <Button variant="contained" type="submit">
              Connect
            </Button>
          </form>
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
