import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

// TODO: Add ability to make the list of filters based on players career currently hard coded
const CareerFilter = ({ dataFilter, filterNames }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAndFilter = filterName => {
    dataFilter(filterName);
    setAnchorEl(null);
  };

  return(
    <div>
      <IconButton
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterList />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleCloseAndFilter('')}>Show All</MenuItem>
        {filterNames.map(filter => (
          <MenuItem key={filter} onClick={() => handleCloseAndFilter(filter)}>{filter}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CareerFilter;