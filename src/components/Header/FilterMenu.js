import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';

export default function FilterMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mainpage-icon">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <FilterListIcon/>
        Filter Search
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Refresh Post</MenuItem>
        <MenuItem onClick={handleClose}>Post you liked</MenuItem>
        <MenuItem onClick={handleClose}>Post you dislike</MenuItem>
        <MenuItem onClick={handleClose}>Post you share</MenuItem>
      </Menu>
    </div>
  );
}