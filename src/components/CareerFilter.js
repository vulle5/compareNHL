import React, {useEffect, useState} from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

const CareerFilter = ({ dataFilter, filterNames, swipeReferences }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    swipeReferences.current.updateHeight();
  });

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
