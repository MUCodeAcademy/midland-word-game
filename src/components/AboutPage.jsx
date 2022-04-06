import React from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function AboutPage() {
  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={6}
      className="center padding-20"
    >
      <Grid item xs={12}>
        <Typography variant="h4">About</Typography>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Russell" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Russell Dunham</Typography>
            <Typography variant="body2">Write about yourself here</Typography>
            <IconButton href="" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Brett" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Brett Ellis</Typography>
            <Typography variant="body2">Write about yourself here</Typography>
            <IconButton href="" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Sydney" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Sydney Havengar</Typography>
            <Typography variant="body2">Write about yourself here</Typography>
            <IconButton href="" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Sophie" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Sophie Newell</Typography>
            <Typography variant="body2">
              I am a junior developer with a background in art and design. I'm
              drawn to the creative, yet logic driven, nature of coding and have
              been building my skill set over the past three months at Midland
              Code Academy. I'm excited to keep learning and growing!
            </Typography>
            <IconButton href="https://github.com/sophienewell" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/sophie-newell-omaha/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Tom" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Tom Schumacher</Typography>
            <Typography variant="body2">Write about yourself here</Typography>
            <IconButton href="" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
