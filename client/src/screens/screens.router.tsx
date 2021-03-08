import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeType } from '@app';
import { LoggedInUser } from '@components/user';
import { UserRouter } from './user';
import { SummaryRouter } from './summary';
import { SkillRouter } from './skill';
import { DesignationRouter } from './designation';
import { SkillWeightagesRouter } from './skill-weightages';
import { DesignationSkillWeightageRouter } from './designation-skill-weightage';

export const ScreenRoutes = ({
    user,
    theme,
}: {
    user: LoggedInUser;
    theme: ThemeType;
}) => {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* NS - Switch Route Order is important, as keeping Home route as last, else use 'exact' */}
            <Switch>
                <Route
                    path={
                        DesignationSkillWeightageRouter.getBaseRoutes().root
                            .path
                    }
                >
                    <DesignationSkillWeightageRouter.Router />
                </Route>
                <Route path={DesignationRouter.getBaseRoutes().root.path}>
                    <DesignationRouter.Router />
                </Route>
                <Route path={SkillRouter.getBaseRoutes().root.path}>
                    <SkillRouter.Router />
                </Route>
                <Route path={SkillWeightagesRouter.getBaseRoutes().root.path}>
                    <SkillWeightagesRouter.Router />
                </Route>
                <Route path={UserRouter.getBaseRoutes().root.path}>
                    <UserRouter.Router />
                </Route>
                <Route path={SummaryRouter.getBaseRoutes().root.path}>
                    <SummaryRouter.Router />
                </Route>
                <Route path="/">
                    <SummaryRouter.Router />
                </Route>
            </Switch>
        </Router>
    );
};
