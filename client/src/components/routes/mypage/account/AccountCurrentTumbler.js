import React from "react";
import propTypes from "prop-types";

function AccountCurrentTumbler({
  model,
  shop,
  borrowed_date,
  usable_period_date,
}) {
  return (
    <>
      <h3>{model}</h3>
      <h5>{shop}</h5>
      <span>{borrowed_date}</span>
      <span>{usable_period_date}</span>
    </>
  );
}

AccountCurrentTumbler.propTypes = {
  model: propTypes.string,
  shop: propTypes.string,
  borrowed_date: propTypes.string,
  usable_period_date: propTypes.string,
};

export default AccountCurrentTumbler;
