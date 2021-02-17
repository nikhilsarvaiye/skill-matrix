import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SkillRouter, SkillRouteNames, SkillEdit, SkillsScreen } from './skill';

export const ScreenRoutes = () => {
    return (
        <Router>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/skills">About</Link>
            </li>
            <li>
                <Link to="/skill">Dashboard</Link>
            </li>
            <Switch>
                <Route path="/">
                    <SkillsScreen />
                </Route>
                <Route path="/skills">
                    <SkillsScreen />
                </Route>
                <Route path="/skill/id?">
                    <SkillEdit />
                </Route>
            </Switch>
        </Router>
    );
};
