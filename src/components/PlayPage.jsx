import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import useSocket from "../shared/hooks/useSocket";
import GroupsIcon from "@mui/icons-material/Groups";
import ManIcon from "@mui/icons-material/Man";

export const PlayPage = () => {
  const [roomId, setRoomId] = useState("");
  const [roomIdError, setRoomIdError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { createRoom, checkRoom, socketRoomIdError, checkedRoomId, error } = useSocket();

  useEffect(() => {
    if (roomId.length < 5) {
      setRoomIdError("Must be at least 5 characters");
    } else if (roomId.length > 6) {
      setRoomIdError("Must be at max 6 characters");
    } else if (roomId === checkedRoomId) {
      setRoomIdError(socketRoomIdError);
      setShowError(true);
    } else {
      setRoomIdError(null);
    }
  }, [roomId, socketRoomIdError, checkedRoomId]);

  const redirect = useCallback(() => {
    setShowError(true);
    if (!roomIdError) {
      checkRoom(roomId);
    }
  }, [roomId, roomIdError, checkRoom]);

  return (
    <div className="play-page-container">
    {error && <span>{error}</span>}
      <div className="play-page-main">
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
        </div>
        <div className="right-container">
          <div className="play-page-button">
            <Button variant="contained" onClick={() => createRoom()}>
              Create Room
            </Button>
          </div>
          <div className="play-page-button">
            <Button className="play-page-button" variant="contained" startIcon={<ManIcon />} onClick={() => navigate("/classic")}>
              Play Solo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlayPage);
