import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes } from '@screens/base';
import { DesignationsScreen, DesignationEdit } from '.';

interface DesignationRoutes extends Routes {}

class DesignationRouter extends BaseRouter<DesignationRoutes> {
    baseRouteName = 'designation';
    customRoutes: DesignationRoutes | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getBaseRoutes().new.path}>
                    <DesignationEdit />
                </Route>
                <Route path={this.getBaseRoutes().edit.path}>
                    <DesignationEdit />
                </Route>
                <Route path={url}>
                    <DesignationsScreen />
                </Route>
            </Switch>
        );
    };
}

const designationRouter = new DesignationRouter();

export { designationRouter as DesignationRouter };
