import { createTheme } from "@mui/material/styles"

export const generalTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#2E4057',
        },
        secondary: {
            main: '#FF934F',
        },
        info: {
            main: '#2196f3',
        },
        background: {
            default: '#FAF8D4',
            paper: 'rgb(87, 102, 120)',
        },
    },
    button: {
        "&:active": {
            boxShadow: "none",
            color: "secondary",
            variant: "outlined",
        },
        color: "secondary",
        variant: "contained",
    },
})
//ahhh okay, Ill take a look at the link lol HAHA
// damn, i knew they were vanilla
//https://stackoverflow.com/questions/40591095/how-to-change-background-color-of-a-selected-itemlist-material-ui
// Might have to create a theme with some OnHovers
// 
//