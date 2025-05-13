const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error(" Please Enter the Name");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error(" First Name should be 4-50 Characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error(" Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" Please enter a Strong Password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
