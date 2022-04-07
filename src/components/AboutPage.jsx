import React from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TomAndOliver from "../shared/assets/TomAndOliver.jpeg";
import HeadshotBrett from "../shared/assets/HeadshotBrett.jpg";

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
            <Typography variant="body2">
              I am fresh out of a coding boot camp where I learned to be a full
              stack developer. Now I am trying to get my foot in the door to get
              a job in software development.
            </Typography>
            <IconButton href="https://github.com/Melrov" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/russell-d-6a94b5231/" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Brett" src={HeadshotBrett} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Brett Ellis</Typography>
            <Typography variant="body2">
              Hey y'all, I'm an up and coming junior developer.
              You could say I'm generally a tech-savy person.
              Hardware, software, frontend, backend, chances are that I've fiddled around with it at some point.
              Planning to go on to work at my family's business, Sycamore Leaf Solutions.
              Excited to get my hands dirty with whatever life gives me next!
            </Typography>
            <IconButton href="https://github.com/BrettAshEllis" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/brett-ellis-4b5a82188/" target="_blank">
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
          <Avatar src={TomAndOliver} alt="Tom" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Tom Schumacher</Typography>
            <Typography variant="body2">Hi there! *waves* I'm Tom.
              I am an aspiring Software Developer recently finishing up at Midland Code Academy.
              My career until recently was focused around helping organizations hire the best
              people to build cool stuff, but now I want to be one of those people building the cool stuff.
              Let's build some cool stuff together.
            </Typography>
            <IconButton href="https://github.com/TomSchumacherCode" target="_blank">

              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/tom-schumacher-ab307251/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
