import React from 'react';
import PropTypes from 'prop-types';

import ReactLoadingSkeleton, { SkeletonTheme } from 'react-loading-skeleton';

// const Skeleton = props => {
const Skeleton = React.forwardRef((props, ref) => {
    const { color, highlightColor, ...other } = props;

    return (
        <SkeletonTheme color={color} highlightColor={highlightColor} ref={ref}>
            <ReactLoadingSkeleton {...other} />
        </SkeletonTheme>
    );
});

export default Skeleton;
