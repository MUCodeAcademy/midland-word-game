import React from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TomAndOliver from "../shared/assets/TomAndOliver.jpeg";
import HeadshotRussell from "../shared/assets/HeadshotRussell.jpg"

import syd from "../shared/assets/syd.jpg";

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
          <Avatar
            alt="Russell"
            src={HeadshotRussell}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Russell Dunham</Typography>
            <Typography variant="body2">
              I did some self teaching for awhile then went to a coding boot
              camp to round out my knowledge. Now I have finished that boot camp
              where I learned all the tools to become a full stack developer. So I
              am currently looking to get my foot in the door to get a job in
              software development.
            </Typography>
            <IconButton href="https://github.com/Melrov" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/russell-d-6a94b5231/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar
            alt="Brett"
            src={HeadshotBrett}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Brett Ellis</Typography>
            <Typography variant="body2">
              Hey y'all, I'm an up and coming junior developer. You could say
              I'm generally a tech-savy person. Hardware, software, frontend,
              backend, chances are that I've fiddled around with it at some
              point. Planning to go on to work at my family's business, Sycamore
              Leaf Solutions. Excited to get my hands dirty with whatever life
              gives me next!
            </Typography>
            <IconButton href="https://github.com/BrettAshEllis" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/brett-ellis-4b5a82188/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar src={syd} alt="Sydney" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Sydney Havengar</Typography>
            <Typography variant="body2">
              My overlapping interest in art and STEM led me to make a full time
              commitment to learning full-stack development at Midland’s Code
              Academy. Due to the immersive nature of the program, I have gotten
              familiar with being uncomfortable and understand that is where
              growth is. I am eager to explore the immense possibilities that
              tech presents and growing as a developer along the way.
            </Typography>
            <IconButton href="https://github.com/shavengar" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/sydney-havengar-b43099215/"
              target="_blank"
            >
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
          <Avatar
            src={TomAndOliver}
            alt="Tom"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Tom Schumacher</Typography>

            <Typography variant="body2">
              Hi there! *waves* I'm Tom. I am an aspiring Software Developer
              recently finishing up at Midland Code Academy. My career until
              recently was focused around helping organizations hire the best
              people to build cool stuff, but now I want to be one of those
              people building the cool stuff. Let's build some cool stuff
              together.
            </Typography>
            <IconButton
              href="https://github.com/TomSchumacherCode"
              target="_blank"
            >
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
