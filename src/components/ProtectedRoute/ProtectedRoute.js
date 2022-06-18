import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { userInfo as userInfoContext } from "../../contexts/Classificators";

function withProtection(Component) {
  return function ({ path, ...props }) {
    const userInfo = useContext(userInfoContext);
    return (
      <Route path={path}>
        {userInfo.username ? (
          <Component {...props} />
        ) : (
          <Redirect to="/komand" />
        )}
      </Route>
    );
  };
}

export default withProtection;
