import React, { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

const CareerFilter = ({
  dataFilter,
  filterNames,
  swipeReferences,
  showAll
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    swipeReferences.current.updateHeight();
  }, [swipeReferences, dataFilter]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAndFilter = filterName => {
    dataFilter(filterName);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-owns={anchorEl ? "simple-menu" : undefined}
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
        {showAll ? (
          <MenuItem onClick={() => handleCloseAndFilter("")}>Show All</MenuItem>
        ) : null}
        {filterNames.map(filter => (
          <MenuItem key={filter} onClick={() => handleCloseAndFilter(filter)}>
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

CareerFilter.defaultProps = {
  dataFilter: () => {},
  filterNames: [],
  swipeReferences: { current: { updateHeight: () => {} } },
  showAll: false
};

export default CareerFilter;
