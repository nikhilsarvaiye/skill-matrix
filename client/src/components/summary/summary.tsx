import { Chart } from '@components/base/components/charts';
import { Widget, WidgetColor } from '@components/base/components/widget';
import './summary.scss';

export const Summary = () => {
    return (
        <div className="summary-container">
            <div className="summary">
                <div className="widgets">
                    <Widget color={WidgetColor.Red} title="Employee">
                        5
                    </Widget>
                    <Widget color={WidgetColor.Blue} title="Employee">
                        20
                    </Widget>
                    <Widget color={WidgetColor.Green} title="Employee">
                        10
                    </Widget>
                    <Widget color={WidgetColor.Purple} title="Employee">
                        200
                    </Widget>
                </div>
                <div className="charts">
                    <Chart
                        // options={{
                        //     chart: {
                        //         backgroundColor: 'transparent',
                        //         // height: (9.5 / 20) * 100 + '%',
                        //     },
                        //     // colors: ['#7bd6c7', '#a3e1d6'],
                        // }}
                    />
                </div>
            </div>
        </div>
    );
};
