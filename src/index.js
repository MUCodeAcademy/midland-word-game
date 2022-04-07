import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import ErrorBoundary from "./shared/components/ErrorBoundary";
import store from "./redux/store"
import { ThemeProvider } from "@mui/material/styles";
import { generalTheme } from "./shared/mui-theme";


ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={generalTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
