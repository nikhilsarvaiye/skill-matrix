import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes } from '@screens/base';
import {
    DesignationSkillWeightagesScreen,
    DesignationSkillWeightageEdit,
} from '.';

interface DesignationSkillWeightageRoutes extends Routes {}

class DesignationSkillWeightageRouter extends BaseRouter<DesignationSkillWeightageRoutes> {
    baseRouteName = 'designation-skill-weightages';
    customRoutes: DesignationSkillWeightageRoutes | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getBaseRoutes().new.path}>
                    <DesignationSkillWeightageEdit />
                </Route>
                <Route path={this.getBaseRoutes().edit.path}>
                    <DesignationSkillWeightageEdit />
                </Route>
                <Route path={url}>
                    <DesignationSkillWeightagesScreen />
                </Route>
            </Switch>
        );
    };
}

const designationSkillWeightageRouter = new DesignationSkillWeightageRouter();

export { designationSkillWeightageRouter as DesignationSkillWeightageRouter };
