import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes } from '@screens/base';
import { SkillWeightagesScreen } from './skill-weightages';

interface SkillRoutes extends Routes {}

class SkillWeightagesRouter extends BaseRouter<SkillRoutes> {
    baseRouteName = 'skill';
    customRoutes: SkillRoutes | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={`/skill/:id?`}>{/* <SkillEdit /> */}</Route>
                <Route path={url}>
                    <SkillWeightagesScreen />
                </Route>
            </Switch>
        );
    };
}

const skillWeightagesRouter = new SkillWeightagesRouter();

export { skillWeightagesRouter as SkillWeightagesRouter };
