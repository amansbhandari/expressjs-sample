import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileListing.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  picture: string;
}

function ProfileListing() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfile, setFilteredProfile] = useState<Profile[]>([]);

  useEffect(() => {
    axios
      .get("https://tutorial4-api.herokuapp.com/api/users/")
      .then(function (response) {
        setProfiles(response.data.data);
        setFilteredProfile(response.data.data);
      })
      .catch(function (error) {});
  }, []);

  const searchUsers = (searchValue: string) => {
    if (searchValue !== "") {
      const filtered = profiles.filter((item) => {
        return (
          item.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchValue.toLowerCase())
        );
      });

      setFilteredProfile(filtered);
    } else {
      setFilteredProfile(profiles);
    }
  };

  return (
    <Box>
      <TextField
        type="text"
        label="Search"
        variant="outlined"
        className="TextFields"
        onChange={(e) => {
          searchUsers(e.target.value);
        }}
      />
      <TableContainer sx={{ width: "80%", margin: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Picture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProfile.map((profile) => (
              <TableRow
                key={profile.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  navigate("/userprofile", {
                    state: {
                      id: profile.id,
                    },
                  });
                }}
              >
                <TableCell component="th" scope="row">
                  {profile.id}
                </TableCell>
                <TableCell align="right">{profile.firstName}</TableCell>
                <TableCell align="right">{profile.lastName}</TableCell>
                <TableCell align="right">{profile.email}</TableCell>
                <TableCell align="right">{profile.title}</TableCell>
                <TableCell align="right">
                  <img src={profile.picture} alt="new" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProfileListing;
