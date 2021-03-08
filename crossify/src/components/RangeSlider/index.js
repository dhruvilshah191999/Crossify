import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      root: {
        width: 160,
      },
      thumb: {
        color: "#00838f",
      },
      track: {
        color: "#00838f",
      },
      rail: {
        color: "gray",
      },
    },
  },
});
const useStyles = makeStyles({
  root: {
    width: 180,
    color: "#3a8589",
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getData(value);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={muiTheme}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </ThemeProvider>
    </div>
  );
}
