import React, { useState, useRef, useCallback } from "react";
import useSocket from "../../shared/hooks/useSocket";
import { useParams } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";

function Chat() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  console.log(messages);

  return (
    <Box sx={{ width: 300, height: 300, backgroundColor: "pink" }}>
      {messages.map((msg) => {
        <div>
          <span>{msg.username}</span>
          <span>{msg.body}</span>
        </div>;
      })}
      <List>
        {messages.map((msg) => {
          <ListItem alignItems="flex-start">
            <ListItemText secondary={msg.username}>
              <Typography sx={{ color: msg.color }}>{msg.username}</Typography>;
              {msg.body}
            </ListItemText>
          </ListItem>;
        })}
      </List>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton
        onClick={() => {
          if (message.length > 0) {
            sendMessage(message);
            setMessage("");
          }
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default Chat;
