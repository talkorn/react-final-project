import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Fragment } from "react";
import PropTypes from "prop-types";

const UserComponent = (userArr) => {
  const descriptions = userArr.description;
  const inputStates = userArr.inputStates;
  const onChanges = userArr.onChanges;
  const inputsErrorsStates = userArr.inputsErrorsStates;
  const requireds = userArr.required;

  return (
    <Fragment>
      <TextField
        required={requireds}
        fullWidth
        id={descriptions}
        type={descriptions}
        label={descriptions}
        name={descriptions}
        autoComplete={descriptions}
        value={inputStates[descriptions]}
        onChange={onChanges}
      />

      {inputsErrorsStates &&
        inputStates[descriptions] &&
        inputsErrorsStates[descriptions] && (
          <Alert severity="warning">
            {descriptions === "password" ? (
              <div>
                password should contain at least one uppercase and one lowercase
                letter. length should be between 6 and 10.
              </div>
            ) : (
              inputsErrorsStates[descriptions].map((item) => (
                <div key={descriptions + "-errors" + item}>{item}</div>
              ))
            )}
          </Alert>
        )}
    </Fragment>
  );
};

UserComponent.propTypes = {
  description: PropTypes.string.isRequired,
  inputStates: PropTypes.object.isRequired,
  onChanges: PropTypes.func,
  inputsErrorsStates: PropTypes.object,
  required: PropTypes.bool,
};

export default UserComponent;
