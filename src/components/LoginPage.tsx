import "./LoginPage.css";
import Grid from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); //store email id
  const [password, setPassword] = useState(""); //to be used to compare both passwords
  const [alert, setAlert] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .post("https://tutorial4-api.herokuapp.com/api/users/login", {
            email: email,
            password: password,
          })
          .then(function (response) {
            navigate("/profilelist");
          })
          .catch(function (error) {
            setAlert(error.response.data.message);
          });
      }}
    >
      <Grid spacing={0} className="Grid">
        <Box className="Box">
          <h2 className="InputLabel">Login</h2>
        </Box>
        <Box className="Box">
          <TextField
            required
            type="email"
            className="textfield"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box className="Box">
          <TextField
            required
            className="textfield"
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Box>
        <Box className="Box">
          <Button type="submit" variant="contained" className="Button">
            Submit
          </Button>
        </Box>
        {alert ? <Alert severity="error">{alert}</Alert> : <></>}{" "}
      </Grid>
    </form>
  );
}

export default LoginPage;
