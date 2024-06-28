import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyRoutes from './routes';

/* 
    TODO:
      - Reorgnize/rename/create files as you see fit
        There is plenty of room for improvement here ;)
      - The level of ui/ux is up to you
    Style:
      We use Material-UI(https://mui.com/material-ui/all-components/) for the components, feel free to use any other library or create your own
    Routing:
      This app uses react-router-dom(https://reactrouter.com/en/main), it can be changed or ignored if other navigation system is prefered
    Installs:
      npm install react-scripts
      npm install react react-dom @types/react @types/react-dom
      npm install react-router-dom 
      npm i @mui/icons-material
      npm install @mui/material @emotion/react @emotion/styled
    Srcipts:
      npm run start
*/

const htmlRoot = document.getElementById('root')
htmlRoot.style.margin = "10px";
htmlRoot.style.padding = "10px";

ReactDOM.createRoot(htmlRoot).render(
  <React.StrictMode>
    <MyRoutes />
  </React.StrictMode>
);