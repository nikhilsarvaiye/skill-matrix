import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes } from '@screens/base';
import { SkillsScreen } from './skills';
import { SkillEdit } from './skill-edit';
import { Observer } from 'mobx-react';

interface SkillRoutes extends Routes {}

class SkillRouter extends BaseRouter<SkillRoutes> {
    baseRouteName = 'skill';
    customRoutes: SkillRoutes | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                {/* <Route path={`${this.getRoutes().edit}`}>
                    <SkillEdit />
                </Route> */}
                <Route path={`/skill/:id?`}>
                    <SkillEdit />
                </Route>
                <Route path={url}>
                    <SkillsScreen />
                </Route>
            </Switch>
        );
    };
}

const skillRouter = new SkillRouter();

export { skillRouter as SkillRouter };
