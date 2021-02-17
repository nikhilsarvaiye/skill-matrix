// import env from 'react-dotenv';
import { Internationalization } from './internationalization';
import { Input } from '@library/input';
import { Dropdown } from '@library/dropdown';
import { DatePicker } from '@library/date-picker';
import { TableDemo } from '@library/table/demo';
import { DemoForm } from '@library/form/demo';
import { Button, ButtonHTMLType, ButtonType } from './library/button';

export const AppDemo = () => {
    return (
        <div className="app">
            {/* <InternationalizationDemo /> */}
            <div className="content">
                <Internationalization>
                    {/* <div>{env.ENV}</div> */}
                    <div>
                        <TableDemo />
                    </div>
                    <div>
                        <DemoForm />
                    </div>
                    <div style={{ display: 'flex', margin: '20px' }}>
                        <Button
                            type={ButtonType.Primary}
                            htmlType={ButtonHTMLType.Button}
                        >
                            Primary Button
                        </Button>
                        <Button type={ButtonType.Secondary}>
                            Secondary Button
                        </Button>
                        <Button type={ButtonType.Tertiary}>
                            Tertiary Button
                        </Button>
                        <Button type={ButtonType.Quaternary}>
                            Quaternary Button
                        </Button>
                    </div>
                </Internationalization>
            </div>
        </div>
    );
};
