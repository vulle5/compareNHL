import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem, Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { setFilter } from '../reducers/filterReducer';

const CareerFilter = ({
  filterNames,
  filterKey,
  buttonTitle,
  swipeReferences,
  eraseFilter,
  setFilter
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const matches = useMediaQuery(theme => theme.breakpoints.up('md'));

  useEffect(() => {
    swipeReferences.current.updateHeight();
  }, [swipeReferences, filterNames, filterKey]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAndFilter = (filterName, key) => {
    setFilter(filterName, key);
    setAnchorEl(null);
  };

  return (
    <div style={{ margin: '16px' }}>
      <Button
        aria-owns={anchorEl && 'simple-menu'}
        aria-haspopup="true"
        title="Filter"
        variant="outlined"
        onClick={handleClick}
      >
        {buttonTitle}
        <ArrowDropDownIcon style={{ marginLeft: '16px' }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {eraseFilter && (
          <MenuItem onClick={() => handleCloseAndFilter('', filterKey)}>
            {eraseFilter}
          </MenuItem>
        )}
        {filterNames.map(filter => (
          <MenuItem
            dense={matches ? true : false}
            key={filter}
            onClick={() => {
              handleCloseAndFilter(filter, filterKey);
            }}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

CareerFilter.defaultProps = {
  filterNames: [],
  swipeReferences: { current: { updateHeight: () => {} } },
  filterKey: '',
  buttonTitle: 'Filter'
};

export default connect(
  null,
  { setFilter }
)(CareerFilter);
