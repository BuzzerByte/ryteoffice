import React from 'react';
import { Typography } from '@material-ui/core';

import { Master as MasterLayout } from './layouts';

const Home = React.forwardRef((props, ref) => {
    const primaryAction = {
        text: 'Export Stats',
        clicked: () => alert('Exporting your awesome stats...'),
    };

    const tabs = [
        {
            name: 'Overview',
            active: true,
        },

        {
            name: 'Monthly',
            active: false,
        },
    ];

    return (
        <MasterLayout
            {...props}
            ref = {ref}
            pageTitle={Lang.get('navigation.dashboard')}
            primaryAction={primaryAction}
            tabs={tabs}
        >
            <Typography>There is no place like home</Typography>
        </MasterLayout>
    );
});

export default Home;
