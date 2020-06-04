import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Checkbox, Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SignUpAction } from '../actions/formAction';
import {
  VerifyPasswordStrenght,
  VerifyEmail,
  VerifyText,
  VerifyFile,
} from '../function/verifyInput';
import FieldFileInput from '../components/FieldFileInput';

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
      case 3:
        return (
          <TextField
            {...props.input}
            rows="5"
            col="10"
            multiline
            label={props.label}
          />
        );
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
              component={this.renderFormFields}
              props={{
                label: 'Enter your name',
                idfield: 1,
                type: 'text',
              }}
              type="text"
            />
            <Field
              id={FieldsType.surname}
              name={FieldsType.surname}
              component={this.renderFormFields}
              props={{
                label: 'Enter your surname',
                idfield: 1,
                type: 'text',
              }}
              type="text"
            />
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
            <Field
              component={this.renderFormFields}
              props={{
                label: 'Enter a short description of you',
                idfield: 3,
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
                acceptList: ['jpg', 'gif', 'bmp', 'png'],
              }}
              type="file"
              component={FieldFileInput}
            />
            <div className="row">
              <Field
                component={this.renderFormFields}
                props={{
                  color: 'primary',
                  idfield: 2,
                }}
                id={FieldsType.remenber}
                name={FieldsType.remenber}
                defaultChecked="false"
              />
              <label className="label">Remenber Me on this Machine</label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  SignUpAction,
};

function mapStateToProps(state) {
  return {
    formInfo: state.form.SignUp,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

//Sequelize graphql express-graphql
