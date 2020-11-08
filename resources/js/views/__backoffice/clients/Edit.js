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
import { Client } from '../../../models';
import { LinearIndeterminate } from '../../../ui/Loaders';
import { Master as MasterLayout } from '../layouts';

import { Profile, Address, Others } from './Forms';

const Edit = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState([]);
    const [client, setClient] = useState({});
    const [message, setMessage] = useState({});

    /**
     * Fetch the client.
     *
     * @param {number} id
     *
     * @return {undefined}
     */
    const fetchClient = async id => {
        setLoading(true);

        try {
            const client = await Client.show(id);

            setClient(client);
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
            
            const updatedClient = await Client.update(client.id, {
                ...previousValues,
                ...values,
            });
            // After persisting the previous values. Move to the next step...
            let newFormValues = [...formValues];
            newFormValues[activeStep] = values;
            if (activeStep === 2) {
                setMessage({
                    type: 'success',
                    body: Lang.get('resources.updated', {
                        name: 'Client',
                    }),
                    closed: () => setMessage({}),
                });
                
                history.push(
                    NavigationUtils.route(
                        'backoffice.resources.clients.index',
                    )
                );
            }
            
            setLoading(false);
            setFormValues(newFormValues);
            setClient(client);
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
        if (Object.keys(client).length > 0) {
            return;
        }

        const { params } = props.match;
        const { location } = props;

        const queryParams = UrlUtils.queryParams(location.search);

        if (queryParams.hasOwnProperty('step')) {
            setActiveStep(parseInt(queryParams.step));
        }

        fetchClient(params.id);
    });

    const { classes, ...other } = props;
    const { history } = props;

    const steps = ['Profile', 'Address', 'Others'];

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
            name: client.name === null ? '' : client.name,
            company: client.company === null ? '' : client.company,
            phone: client.phone === null ? '' : client.phone,
            email: client.email === null ? '' : client.email,
            fax: client.fax === null ? '' : client.fax,
            open_balance: client.open_balance === null ? '' : client.open_balance,
            billing_address: client.billing_address === null ? '' : client.billing_address,
            shipping_address: client.shipping_address === null ? '' : client.shipping_address,
            website: client.website === null ? '' : client.website,
            note:client.note === null ? '' : client.note,
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
                            billing_address: client.billing_address === null ? '' : client.billing_address,
                            shipping_address: client.shipping_address === null ? '' : client.shipping_address,
                        }}
                        handleSubmit={handleSubmit}
                        handleBack={handleBack}
                    />
                );

            case 2:
                return (
                    <Others
                        {...other}
                        values={{
                            fax: client.fax === null ? '' : client.fax,
                            website: client.website === null ? '' : client.website,
                            open_balance:client.open_balance === null ? '' : client.open_balance,
                            note: client.note === null ? '' : client.note,
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
            pageTitle="Edit client"
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
                            Client Modification
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
