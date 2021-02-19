import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SkillRouter } from './skill';

export const ScreenRoutes = () => {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* NS - Switch Route Order is important, as keeping Home route as last, else use 'exact' */}
            <Switch>
                <Route path="/skills">
                    <SkillRouter.Router />
                </Route>
                <Route path="/">
                    <SkillRouter.Router />
                </Route>
            </Switch>
        </Router>
    );
};
