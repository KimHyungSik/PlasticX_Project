import React from "react";
import propTypes from "prop-types";

function AccountCurrentTumbler({ model, shop, returned_date }) {
  return (
    <>
      <div className="account-name">{model}</div>
      <div>{shop}</div>
      <div>{returned_date}</div>
    </>
  );
}

AccountCurrentTumbler.propTypes = {
  model: propTypes.string,
  shop: propTypes.string,
  returned_date: propTypes.string,
};

export default AccountCurrentTumbler;
