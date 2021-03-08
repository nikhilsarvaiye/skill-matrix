import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes } from '@screens/base';
import { UserSkillWeightagesScreen, UserSkillWeightageEdit } from '.';

interface UserSkillWeightageRoutes extends Routes {}

class UserSkillWeightageRouter extends BaseRouter<UserSkillWeightageRoutes> {
    baseRouteName = 'user-skill-weightage';
    customRoutes: UserSkillWeightageRoutes | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                {/* <Route path={this.getBaseRoutes().new.path}>
                    <UserSkillWeightageEdit />
                </Route> */}
                <Route path={this.getBaseRoutes().edit.path}>
                    <UserSkillWeightageEdit />
                </Route>
                <Route path={url}>
                    <UserSkillWeightagesScreen />
                </Route>
            </Switch>
        );
    };
}

const userSkillWeightageRouter = new UserSkillWeightageRouter();

export { userSkillWeightageRouter as UserSkillWeightageRouter };
