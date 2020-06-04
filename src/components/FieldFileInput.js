import React from 'react';
import PublishIcon from '@material-ui/icons/Publish';

export default function FieldFileInput(props) {
  const [change, setChange] = React.useState(false);

  const onChangeInput = (e, props) => {
    const {
      input: { onChange },
    } = props;
    onChange(e.target.files[0]);
    setChange(true);
  };

  const {
    input: { value },
  } = props;
  const { input, label, required, idInput, acceptList } = props;

  return (
    <div className="file">
      <label htmlFor={idInput} className="file-label">
        <PublishIcon />
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
  );
}
