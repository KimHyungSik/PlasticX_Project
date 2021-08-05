import React from "react";
import propTypes from "prop-types";

function AccountUser({ name, email, deposit }) {
  return (
    <>
      <h3>{name}</h3>
      <h5>{email}</h5>
      <h5>{deposit}</h5>
    </>
  );
}

AccountUser.propTypes = {
  name: propTypes.string,
  email: propTypes.string,
  deposit: propTypes.string,
};

export default AccountUser;
