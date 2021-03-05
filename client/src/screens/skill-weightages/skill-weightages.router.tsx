import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes } from '@screens/base';
import { SkillWeightageEdit } from './skill-weightage-edit';
import { SkillWeightagesScreen } from './skill-weightages';

interface SkillWeightagesRoutes extends Routes {}

class SkillWeightagesRouter extends BaseRouter<SkillWeightagesRoutes> {
    baseRouteName = 'skill-weightages';
    customRoutes: SkillWeightagesRoutes | null = null;

    Router = ({ routes }: any) => {
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getBaseRoutes().new.path}>
                    <SkillWeightageEdit />
                </Route>
                <Route path={this.getBaseRoutes().edit.path}>
                    <SkillWeightageEdit />
                </Route>
                <Route path={url}>
                    <SkillWeightagesScreen />
                </Route>
            </Switch>
        );
    };
}

const skillWeightagesRouter = new SkillWeightagesRouter();

export { skillWeightagesRouter as SkillWeightagesRouter };
