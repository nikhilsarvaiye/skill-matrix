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
    NewSkill: '/skills/new',
    EditSkill: '/skills/:id?',
};

export const SkillRouter = ({ routes }: any) => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={url}>
                <SkillsScreen />
            </Route>
            <Route path={SkillRouteNames.Skills}>
                <SkillsScreen />
            </Route>
            <Route path={SkillRouteNames.NewSkill}>
                <SkillEdit />
            </Route>
            <Route path={SkillRouteNames.EditSkill}>
                <SkillEdit />
            </Route>
        </Switch>
    );
};
