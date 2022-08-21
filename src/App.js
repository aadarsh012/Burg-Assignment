import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  registerables
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

import { Box, Paper, Typography, Grid, AppBar, Tabs, Tab, IconButton } from "@mui/material";
import { purple } from "@mui/material/colors";
import { ArrowUpward, MoreHoriz } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ...registerables
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
      {value === index && (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Grid item xs={8}>
            {children}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [chart1Data, setChart1Data] = useState({
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Sales",
        barPercentage: 0.4,
        backgroundColor: purple[500],
        data: [30, 60, 80, 50, 90, 110, 85],
        hoverBackgroundColor: purple[300]
      }
    ]
  });

  const [chart2Data, setChart2Data] = useState({
    labels: ["Apr 04", "Apr 07", "Apr 10", "Apr 13", "Apr 16"],
    datasets: [
      {
        label: "Sales",
        data: [40, 20, 30, 25, 20],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        stepped: true
      }
    ]
  });

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Chart 1" />
          <Tab label="Chart 2" />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Paper elevation={12} sx={{ p: 2, pb: 0, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Typography variant="subtitle1">$</Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h5"
                fontWeight={600}
              >
                2,420
                <Box
                  sx={{
                    ml: 1,
                    px: 1,
                    py: "3px",
                    backgroundColor: "primary.main",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ArrowUpward fontSize="small" sx={{ color: "#fff" }} />
                  <Typography variant="body2" color="#fff">
                    2.6%
                  </Typography>
                </Box>
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Average Daily Sales
            </Typography>
            <Bar
              data={chart1Data}
              height={100}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },

                scales: {
                  x: {
                    display: false
                  },
                  y: {
                    display: false
                  }
                },
                borderRadius: 20
              }}
            />
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Paper elevation={12} sx={{ p: 2, pb: 0, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h6"
                fontWeight={600}
              >
                Sales this Month
              </Typography>
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Users from all channels
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Typography variant="subtitle1">$</Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h5"
                fontWeight={600}
              >
                14,094
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Another $48,346 to Goal
            </Typography>
            <Line
              data={chart2Data}
              height={100}
              options={{
                elements: {
                  line: {
                    tension: 1
                  },
                  point: {
                    radius: 0
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                },
                interaction: {
                  intersect: false,
                  axis: "x"
                },
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, ticks) {
                        return "$" + value + "K";
                      }
                    },
                    min: 0
                  }
                },
                borderRadius: 10
              }}
            />
          </Paper>
        </TabPanel>
      </SwipeableViews>
    </>
  );
}

export default App;
