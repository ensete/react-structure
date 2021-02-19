import React from 'react';
import { Redirect, Switch, BrowserRouter } from "react-router-dom";
import Home from "src/app/components/home/Home";
import Layout from "src/app/components/layout/Layout";
import { ROUTES } from "src/app/configs/constants";
import useSettingUpAccount from "src/app/hooks/useSettingUpAccount";
import GlobalErrorBoundary from "src/app/components/error-boundaries/GlobalErrorBoundary";

const App: React.FC = () => {
  useSettingUpAccount();

  return (
      <div className="app">
        <GlobalErrorBoundary>
          <BrowserRouter>
            <Switch>
              <Layout path={ROUTES.HOME} component={Home} exact/>
              <Redirect to={ROUTES.HOME}/>
            </Switch>
          </BrowserRouter>
        </GlobalErrorBoundary>
      </div>
  )
};

export default App;
