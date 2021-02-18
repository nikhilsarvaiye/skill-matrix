import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';
import { SkillsScreen } from './skills';
import { SkillEdit } from './skill-edit';

export const SkillRouteNames = {
    Skills: 'skills',
    EditSkill: '/skill/:id?',
};

export const SkillRouter = ({ routes }: any) => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={SkillRouteNames.EditSkill}>
                <SkillEdit />
            </Route>
            <Route path={url}>
                <SkillsScreen />
            </Route>
        </Switch>
    );
};
