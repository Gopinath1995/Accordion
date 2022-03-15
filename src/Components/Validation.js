export const Validate = (value) => {
  const { name, email, position, recruiter, status } = value;
  let errors = false;
  //Candidatename Errors
  if (name === "") {
    errors = {
      isError: true,
      FieldName: "name",
      Message: "*Candidate Name cannot be blank.",
    };
    return errors;
  }
  //Email address Errors
  if (email === "") {
    errors = {
      isError: true,
      FieldName: "email",
      Message: "*Email Address cannot be blank.",
    };
    return errors;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors = {
      isError: true,
      FieldName: "email",
      Message: "*Invalid Email address",
    };
    return errors;
  }
  //Positions Errors
  if (position === "") {
    errors = {
      isError: true,
      FieldName: "position",
      Message: "*Position cannot be blank.",
    };
    return errors;
  }
  //Recruiter Errors
  if (recruiter === "") {
    errors = {
      isError: true,
      FieldName: "recruiter",
      Message: "*Recruiter Name cannot be blank.",
    };
    return errors;
  }
  //Status Errors
  if (status === "") {
    errors = {
      isError: true,
      FieldName: "status",
      Message: "*Status cannot be blank.",
    };
    return errors;
  }
  return errors;
};
