import React from "react";
import { Route } from "react-router-dom";
import Header from "src/app/components/layout/Header";
import Footer from "src/app/components/layout/Footer";

interface LayoutProps {
  component: React.ComponentType<any>;
  path: string
  exact: boolean
}

export default function Layout({component: Component, ...rest}: LayoutProps) {
  return (
    <Route {...rest} render={(props) => (
      <div>
        <Header/>
        <Component {...props} />
        <Footer/>
      </div>
    )}/>
  );
}
