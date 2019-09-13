import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { setFilter } from "../reducers/filterReducer";

const CareerFilter = ({
  filterNames,
  filterKey,
  swipeReferences,
  eraseFilter,
  setFilter
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const matches = useMediaQuery(theme => theme.breakpoints.up("md"));

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
        title="Filter"
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
        {eraseFilter && (
          <MenuItem onClick={() => handleCloseAndFilter("", filterKey)}>
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
  filterKey: ""
};

export default connect(
  null,
  { setFilter }
)(CareerFilter);
