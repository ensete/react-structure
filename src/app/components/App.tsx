import React from 'react';
import { Redirect, Switch, BrowserRouter } from "react-router-dom";
import Layout from "src/app/components/layout/Layout";
import { ROUTE } from "src/app/configs/constants";
import useSettingUpAccount from "src/app/hooks/useSettingUpAccount";
import GlobalErrorBoundary from "src/app/components/error-boundaries/GlobalErrorBoundary";
import Home from "src/app/components/home/Home";
import { ModalListener } from "src/app/components/commons/modals/ModalListener";
import useFetchingData from "src/app/hooks/useFetchingData";
import LoadingModal from "src/app/components/commons/modals/LoadingModal";

const App: React.FC = () => {
  useFetchingData();
  useSettingUpAccount();

  return (
    <div className="app">
      <GlobalErrorBoundary>
        <BrowserRouter>
          <Switch>
            <Layout path={ROUTE.HOME} component={Home} exact={false}/>
            <Redirect to={ROUTE.HOME}/>
          </Switch>
        </BrowserRouter>

        <ModalListener/>
        <LoadingModal/>
      </GlobalErrorBoundary>
    </div>
  )
};

export default App;
