import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

import { setFilter } from "../reducers/filterReducer";

const CareerFilter = ({
  filterNames,
  filterKey,
  swipeReferences,
  showAll,
  setFilter
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
    <div>
      <IconButton
        aria-owns={anchorEl && "simple-menu"}
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
        {showAll && (
          <MenuItem onClick={() => handleCloseAndFilter("", filterKey)}>
            Show All
          </MenuItem>
        )}
        {filterNames.map(filter => (
          <MenuItem
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
  showAll: false,
  filterKey: ""
};

export default connect(
  null,
  { setFilter }
)(CareerFilter);
