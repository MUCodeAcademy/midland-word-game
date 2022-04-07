import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import useSocket from "../shared/hooks/useSocket";
import GroupsIcon from '@mui/icons-material/Groups';
import ManIcon from '@mui/icons-material/Man';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const PlayPage = ({ }) => {
  const [roomId, setRoomId] = useState("");
  const [roomIdError, setRoomIdError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const {
    createRoom,
    createRoomSolo,
  } = useSocket();

  useEffect(() => {
    if (roomId.length < 5) {
      setRoomIdError("Must be at least 5 characters");
    } else if (roomId.length > 6) {
      setRoomIdError("Must be at max 6 characters");
    } else {
      setRoomIdError(null);
    }
  }, [roomId]);

  const redirect = useCallback(() => {
    if (roomIdError) {
      setShowError(true);
    } else {
      setShowError(null);
      navigate(`/room/${roomId}`);
    }
  }, [roomId, roomIdError]);

  return (
    <div className="play-page-container">
      <div className="left-container">
        <TextField
          label="Room Code"
          variant="standard"
          value={roomId}
          helperText={showError ? roomIdError : ""}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button variant="contained" startIcon={<GroupsIcon />} onClick={() => redirect()}>
          Join Room
        </Button>
        <Button variant="contained" startIcon={<GroupAddIcon />} onClick={() => createRoom()}>
          Create Room
        </Button>
      </div>
      <div className="right-container">
        <div className="play-page-button">

        </div>
        <div className="play-page-button">
          <Button className="play-page-button" variant="contained" startIcon={<ManIcon />} onClick={() => navigate("/classic")}>
            Play Solo
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlayPage);
