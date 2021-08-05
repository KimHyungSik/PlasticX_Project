import React from "react";
import propTypes from "prop-types";

function AccountUser({ name, email, deposit }) {
  return (
    <>
      <div className="account-name">{name}</div>
      <div>{email}</div>
      <div>{deposit}</div>
    </>
  );
}

AccountUser.propTypes = {
  name: propTypes.string,
  email: propTypes.string,
  deposit: propTypes.string,
};

export default AccountUser;
