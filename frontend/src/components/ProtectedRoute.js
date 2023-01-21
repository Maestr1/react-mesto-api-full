import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      { () => props.loggedIn ? <Component { ...props } /> : <Redirect to="./sign-in"/> }
    </Route>
  );
};

export default ProtectedRoute;
