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
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
const intialState = {
  email: "",
  password: "",
};
function Login() {
  const [fromValue, setFormValue] = useState(intialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = fromValue;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ fromValue, navigate, toast }));

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

  const googleSuccess = (resp) => {
    const email = resp?.profileObj.email;
    const name = resp?.profileObj.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));
    console.log(resp);
  };
  const googleFailure = (error) => {
    toast.error(error);
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
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
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
                validation="Please provide your password"
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="391788174595-u2n3ldnkf8i631tet0q10818e8mui657.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have have an account ? sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Login;
