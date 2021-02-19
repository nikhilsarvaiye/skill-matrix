import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';
import { SkillsScreen } from './skills';
import { SkillEdit } from './skill-edit';

export const Routes = {
    Skills: '/skills',
    Skill: '/skill',
    RouteToSkill: (id?: string) => {
        return id ? `skill/${id}` : `/skill`;
    },
};

export const SkillRouter = ({ routes }: any) => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${Routes.Skill}/:id?`}>
                <SkillEdit />
            </Route>
            <Route path={url}>
                <SkillsScreen />
            </Route>
        </Switch>
    );
};
