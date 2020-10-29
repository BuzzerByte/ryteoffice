import React from 'react';
import PropTypes from 'prop-types';

import { LinearProgress, withStyles } from '@material-ui/core';

const LinearIndeterminate = props => (
    <LinearProgress className={props.classes.root} />
);

const styles = theme => ({
    root: {
        margin: `0 ${theme.spacing(1)}px`,
        minHeight: theme.spacing(1),
        borderTopRightRadius: '100%',
        borderTopLeftRadius: '100%',
    },
});

LinearIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearIndeterminate);
