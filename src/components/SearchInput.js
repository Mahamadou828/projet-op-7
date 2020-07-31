import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import lodash from 'lodash';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function SearchInput(props) {
  const classes = useStyles();

  const [filterValue, setFilterValue] = React.useState(null);

  let value = '';

  const { ArrayToFilter, closeFilter, setFilteredArray, keyForFilter } = props;

  const filter = () => {
    if (value.length > 0) {
      const filteredArray = lodash.filter([...ArrayToFilter], (n) => {
        for (const [key, entriesValue] of Object.entries(n)) {
          if (entriesValue !== null) {
            if (keyForFilter.includes(key)) {
              const regex = new RegExp(`${value}`, 'gi');
              return entriesValue.match(regex) !== null;
            } else if (typeof entriesValue === 'object') {
              console.log(entriesValue);
            }
          }
        }
      });
      setFilteredArray(filteredArray);
      setFilterValue(value);
    }
  };

  const removeFilter = () => {
    value = '';
    closeFilter(ArrayToFilter);
    setFilterValue(null);
  };

  return (
    <div>
      <Paper
        component="form"
        className={props.className}
        onSubmit={(e) => {
          e.preventDefault();
          filter();
        }}
      >
        <InputBase
          className={classes.input}
          placeholder={props.placeHolder}
          inputProps={{ 'aria-label': props.placeHolder }}
          onChange={(e) => {
            value = e.target.value;
          }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {filterValue !== null ? (
        <Chip
          className="mx-small margin-top__medium center"
          label={filterValue}
          onDelete={() => {
            removeFilter();
          }}
        />
      ) : null}
    </div>
  );
}

SearchInput.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  className: PropTypes.string,
  setFilteredArray: PropTypes.func.isRequired,
  ArrayToFilter: PropTypes.array.isRequired,
  closeFilter: PropTypes.func.isRequired,
  keyForFilter: PropTypes.array.isRequired,
};

export default SearchInput;
