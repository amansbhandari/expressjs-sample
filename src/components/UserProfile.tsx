import "./UserProfile.css";
import Stack from "@mui/material/Stack";
import { Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface LocationState {
  id: string;
}

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  picture: string;
}

const UserProfile: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation().state as LocationState;
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    axios
      .get("https://tutorial4-api.herokuapp.com/api/users/" + location.id)
      .then(function (response) {
        setProfile(response.data.data);
      })
      .catch(function (error) {
        alert("Error in calling the user fetch api");
      });
  }, [location.id]);

  return (
    <Box className="Grid">
      <h2 className="InputLabel">User Profile</h2>
      <Stack spacing={0}>
        <div>
          <img src={profile?.picture} alt="new" />
        </div>
        <div className="row">
          <label className="key">Id</label>
          <h4 className="value">{profile?.id}</h4>
        </div>
        <div className="row">
          <label className="key">Title</label>
          <h4 className="value">{profile?.title}</h4>
        </div>
        <div className="row">
          <label className="key">First Name</label>
          <h4 className="value">{profile?.firstName}</h4>
        </div>
        <div className="row">
          <label className="key">Last Name</label>
          <h4 className="value">{profile?.lastName}</h4>
        </div>
        <div>
          <label className="key">Email</label>
          <h4 className="value">{profile?.email}</h4>
        </div>
        <Button
          variant="contained"
          className="button-back"
          onClick={() => {
            navigate("/profilelist");
          }}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
};

export default UserProfile;
