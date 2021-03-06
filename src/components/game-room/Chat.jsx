import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ForumIcon from "@mui/icons-material/Forum";
import { Box } from "@mui/system";

function Chat({ roomId, user, messages, sendMessage, setChatFocused }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [Chat, messages]);

  return (
    <Paper sx={{ height: 365, p: 3, backgroundColor: "#FF934F" }} elevation={7}>
      <div className="chatHeader">
        <ForumIcon color="primary" />
        <Typography sx={{ fontWeight: "bold", fontSize: 20, color: "primary" }}>
          Chat:
        </Typography>
      </div>
      <Box
        sx={{
          height: 250,
          p: 2,
          overflowY: "scroll",
          backgroundColor: "#FAF8D4",
          wordWrap: "break-word",
        }}
      >
        <Divider sx={{ fontSize: 13 }}>beginning of chat history</Divider>
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            <Typography
              display="inline"
              sx={{
                color: msg.color,
                fontWeight: "bold",
              }}
            >
              {msg.username}:{" "}
            </Typography>
            <Typography display="inline" paragraph>
              {msg.body}
            </Typography>
            <Divider />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <div className="messageInput padding-10">
        <TextField
          style={{ backgroundColor: "#faf8d4" }}
          size="small"
          id="chat"
          label="New Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          maxRows={4}
          onClick={() => setChatFocused(true)}
          onBlur={() => setChatFocused(false)}
          //margin="normal"
        />
        <IconButton
          onClick={() => {
            if (message.length > 0) {
              sendMessage(message, roomId, user);
              setMessage("");
            }
          }}
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Chat;
