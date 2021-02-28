import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SkillRouter } from './skill';
import { DesignationRouter } from './designation';
import { SkillWeightagesRouter } from './skill-weightages';

export const ScreenRoutes = () => {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* NS - Switch Route Order is important, as keeping Home route as last, else use 'exact' */}
            <Switch>
                <Route path="/designations">
                    <DesignationRouter.Router />
                </Route>
                <Route path="/skills">
                    <SkillRouter.Router />
                </Route>
                <Route path="/skill-weightages">
                    <SkillWeightagesRouter.Router />
                </Route>
                <Route path="/">
                    <DesignationRouter.Router />
                </Route>
            </Switch>
        </Router>
    );
};
