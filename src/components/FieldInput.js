import React from 'react';
import { Checkbox, Button, TextField } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';

export default function FieldInput(props) {
  switch (props.idfield) {
    case 1: {
      return (
        <div className={props.class}>
          <TextField
            className="form-corps-input dark-input"
            {...props.input}
            label={props.label}
            type={props.type}
          />
          {props.error.length > 0 ? (
            <Tooltip title={props.error} placement="left">
              <Button className="toggle-info">
                <ErrorIcon />
              </Button>
            </Tooltip>
          ) : null}
        </div>
      );
    }
    case 2: {
      return (
        <div className={`${props.class} dark-input`}>
          <Checkbox {...props.input} color={props.color} />
          <label className="label">{props.label}</label>
        </div>
      );
    }
    case 3: {
      return (
        <div className={props.class}>
          <TextField
            {...props.input}
            rows="5"
            col="10"
            multiline
            label={props.label}
            className="form-corps-input dark-input"
          />
        </div>
      );
    }

    case 4: {
      const [change, setChange] = React.useState(false);

      const onChangeInput = (e, props) => {
        const {
          input: { onChange },
        } = props;
        onChange(e.target.files[0]);
        setChange(true);
      };
      const { label, required, idInput, acceptList } = props;

      return (
        <Tooltip title={props.error} placement="left">
          <div className={props.class}>
            <label htmlFor={idInput} className="file-label">
              {change ? <CheckCircleIcon /> : <PublishIcon />}
              {label}
            </label>
            <input
              type="file"
              accept={acceptList}
              onChange={(e) => onChangeInput(e, props)}
              required={required}
              className="file-input"
              id={idInput}
              data-change={change.toString()}
            />
          </div>
        </Tooltip>
      );
    }
    default:
      return <TextField {...props.input} className="form-corps-input" />;
  }
}

FieldInput.propTypes = {
  idfield: PropTypes.number,
  class: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
};
