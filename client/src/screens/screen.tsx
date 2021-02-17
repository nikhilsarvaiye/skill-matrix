import { TopNav } from '@screens/layout';

export const Screen = ({ children }: any) => {
    return (
        <div className="screen">
            <TopNav />
            <div className="content">{children}</div>
        </div>
    );
};
