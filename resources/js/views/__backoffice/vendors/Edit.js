import React, { useState, useEffect } from 'react';

import {
    CircularProgress,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    withStyles,
} from '@material-ui/core';

import * as UrlUtils from '../../../helpers/URL';
import * as NavigationUtils from '../../../helpers/Navigation';
import { Vendor } from '../../../models';
import { LinearIndeterminate } from '../../../ui/Loaders';
import { Master as MasterLayout } from '../layouts';

import { Profile, Address, Other } from './Forms';

const Edit = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState([]);
    const [vendor, setVendor] = useState({});
    const [message, setMessage] = useState({});

    /**
     * Fetch the vendor.
     *
     * @param {number} id
     *
     * @return {undefined}
     */
    const fetchVendor = async id => {
        setLoading(true);

        try {
            const vendor = await Vendor.show(id);

            setVendor(vendor);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    /**
     * This should return back to the previous step.
     *
     * @return {undefined}
     */
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    /**
     * Handle form submit, this should send an API response
     * to create a user.
     *
     * @param {object} values
     *
     * @param {object} form
     *
     * @return {undefined}
     */
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        setSubmitting(false);

        //Stop here as it is the last step...

        setLoading(true);

        try {
            let previousValues = {};

            // Merge the form values here.
            if (activeStep === 1) {
                previousValues = formValues.reduce((prev, next) => {
                    return { ...prev, ...next };
                });

            }
            if (activeStep === 2) {
                previousValues = formValues.reduce((prev, next) => {
                    return { ...prev, ...next };
                });
            }

            // Instruct the API the current step.
            values.step = activeStep;
            
            const updatedVendor = await Vendor.update(vendor.id, {
                ...previousValues,
                ...values,
            });
            // After persisting the previous values. Move to the next step...
            let newFormValues = [...formValues];
            newFormValues[activeStep] = values;
            if (activeStep === 2) {
                setMessage({
                    type: 'success',
                    body: Lang.get('resources.created', {
                        name: 'Vendor',
                    }),
                    closed: () => setMessage({}),
                });
                
                history.push(
                    NavigationUtils.route(
                        'vendors.resources.vendors.index',
                    )
                );
            }
            
            setLoading(false);
            setFormValues(newFormValues);
            setVendor(vendor);
            setActiveStep(activeStep + 1);
        } catch (error) {
            if (!error.response) {
                throw new Error('Unknown error');
            }

            const { errors } = error.response.data;

            setErrors(errors);

            setLoading(false);
        }
    };

    useEffect(() => {
        if (Object.keys(vendor).length > 0) {
            return;
        }

        const { params } = props.match;
        const { location } = props;

        const queryParams = UrlUtils.queryParams(location.search);

        if (queryParams.hasOwnProperty('step')) {
            setActiveStep(parseInt(queryParams.step));
        }

        fetchVendor(params.id);
    });

    const { classes, ...other } = props;
    const { history } = props;

    const steps = ['Profile', 'Address', 'Other'];

    const renderLoading = (
        <Grid
            container
            className={classes.loadingContainer}
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <CircularProgress color="primary" />
            </Grid>
        </Grid>
    );

    const renderForm = () => {
        if (loading) {
            return renderLoading;
        }

        const defaultProfileValues = {
            name: vendor.name === null ? '' : vendor.name,
            company: vendor.company === null ? '' : vendor.company,
            phone: vendor.phone === null ? '' : vendor.phone,
            email: vendor.email === null ? '' : vendor.email,
            fax: vendor.fax === null ? '' : vendor.fax,
            open_balance: vendor.open_balance === null ? '' : vendor.open_balance,
            billing_address: vendor.billing_address === null ? '' : vendor.billing_address,
            shipping_address: vendor.shipping_address === null ? '' : vendor.shipping_address,
            website: vendor.website === null ? '' : vendor.website,
            note:vendor.note === null ? '' : vendor.note,
        };

        switch (activeStep) {
            case 0:
                return (
                    <Profile
                        {...other}
                        values={
                            formValues[0] ? formValues[0] : defaultProfileValues
                        }
                        handleSubmit={handleSubmit}
                    />
                );

            case 1:
                return (
                    <Address
                        {...other}
                        values={{
                            billing_address: vendor.billing_address === null ? '' : vendor.billing_address,
                            shipping_address: vendor.shipping_address === null ? '' : vendor.shipping_address,
                        }}
                        handleSubmit={handleSubmit}
                        handleBack={handleBack}
                    />
                );

            case 2:
                return (
                    <Other
                        {...other}
                        values={{
                            fax: vendor.fax === null ? '' : vendor.fax,
                            website: vendor.website === null ? '' : vendor.website,
                            open_balance:vendor.open_balance === null ? '' : vendor.open_balance,
                            note: vendor.note === null ? '' : vendor.note,
                        }}
                        handleSubmit={handleSubmit}
                        handleBack={handleBack}
                    />
                );

            default:
                throw new Error('Unknown step!');
        }
    };

    return (
        <MasterLayout
            {...other}
            pageTitle="Edit vendor"
            tabs={[]}
            message={message}
            ref = {ref}
        >
            <div className={classes.pageContentWrapper}>
                {loading && <LinearIndeterminate />}

                <Paper>
                    <div className={classes.pageContent}>
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            gutterBottom
                        >
                            Vendor Modification
                        </Typography>

                        <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                        >
                            {steps.map(name => (
                                <Step key={name}>
                                    <StepLabel>{name}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {renderForm()}
                    </div>
                </Paper>
            </div>
        </MasterLayout>
    );
});

const styles = theme => ({
    pageContentWrapper: {
        width: '100%',
        marginTop: theme.spacing(1) * 3,
        minHeight: '75vh',
        overflowX: 'auto',
    },

    pageContent: {
        padding: theme.spacing(1) * 3,
    },

    loadingContainer: {
        minHeight: 200,
    },
});

export default withStyles(styles)(Edit);
