import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const intialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Register() {
  const [fromValue, setFormValue] = useState(intialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = fromValue;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && password && confirmPassword) {
      dispatch(register({ fromValue, navigate, toast }));

      // const response = await axios.post("http://localhost:5000/user/signin",fromValue)
      // navigate("/")
      // toast.success("login sucessfully")

      // console.log(response.data)
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...fromValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x"></MDBIcon>
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="FirstName"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide firstName"
              ></MDBInput>
            </div>
            <div className="col-md-6">
              <MDBInput
                label="LastName"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide lastName"
              ></MDBInput>
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide email"
              ></MDBInput>
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide password"
              ></MDBInput>
            </div>
            <div className="col-md-12">
              <MDBInput
                label="ConfirmPassword"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide ConfirmPassword"
              ></MDBInput>
            </div>
            <div className="col-md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Alredy have an account ? sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Register;
