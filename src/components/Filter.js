import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import ramdomNumber from '../function/ramdomNumber';

export default function Filter(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="dark-input"
      >
        {props.children}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.filters.map((filter) => (
          <MenuItem
            key={ramdomNumber()}
            onClick={() => {
              handleClose();
              filter.func(filter.funcParam);
            }}
          >
            {filter.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

Filter.propTypes = {
  filters: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
