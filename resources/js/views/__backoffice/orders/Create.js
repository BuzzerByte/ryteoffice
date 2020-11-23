import React, { useState } from 'react';

import {
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    withStyles,
    Menu,
    MenuItem,
    Button
} from '@material-ui/core';

import * as NavigationUtils from '../../../helpers/Navigation';
import { User } from '../../../models';
import { LinearIndeterminate } from '../../../ui/Loaders';
import { Master as MasterLayout } from '../layouts';
import { Order } from '../../../models';
import { Profile, Address, Others } from './Forms';

// function Create(props) {
const Create = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState([]);
    const [order, setOrder] = useState({});
    const [message, setMessage] = useState({});

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
            
            const client = await Order.store({ ...previousValues, ...values });

            // After persisting the previous values. Move to the next step...
            let newFormValues = [...formValues];
            newFormValues[activeStep] = values;
            if (activeStep === 2) {
                setMessage({
                    type: 'success',
                    body: Lang.get('resources.created', {
                        name: 'Order',
                    }),
                    closed: () => setMessage({}),
                });
                
                history.push(
                    NavigationUtils.route(
                        'clients.resources.clients.index',
                    )
                );
            }
            
            setLoading(false);
            setFormValues(newFormValues);
            setClient(client);
            if(activeStep == 2) activeStep = 0;
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

    const { classes, ...other } = props;
    const { history } = props;

    // const steps = ['Profile', 'Address', 'Others'];

    const renderForm = () => {
        const defaultProfileValues = {
            serial_number: '',
            client_id: '',
            invoice_date: '',
            due_date: '',
            total: '',
            g_total: '',
            tax: '',
            discount: '',
            paid: '',
            balance:'',
            receive_amt:'',
            amt_due:'',
            tracking_no:'',
            delivery_person:'',
            status:'',
            order_note:'',
            order_activities:'',
        };

        return (
            <Formik
                initialValues={values}
                validationSchema={Yup.object().shape({
                    serial_number: Yup.string().required(
                        Lang.get('validation.required', {
                            attribute: 'name',
                        }),
                    ),
                    client_id: Yup.string().required(
                        Lang.get('validation.required',{
                            attribute: 'client_id',
                        }),
                    ),
                    invoice_date: Yup.date().required(
                        Lang.get('validation.required',{
                            attribute: 'invoice_date',
                        }),
                    ),
                    due_date: Yup.date().required(
                        Lang.get('validation.required',{
                            attribute: 'due_date',
                        }),
                    ),
                    total: Yup.number().required(
                        Lang.get('validation.required',{
                            attribute: 'total',
                        }),
                    ).positive(),
                    g_total: Yup.number().required(
                        Lang.get('validation.required',{
                            attribute: 'g_total',
                        }),
                    ).positive(),
                })}
                onSubmit={async (values, form) => {
                    let mappedValues = {};
                    let valuesArray = Object.values(values);

                    // Format values specially the object ones (i.e Moment)
                    Object.keys(values).forEach((filter, key) => {
                        if (
                            valuesArray[key] !== null &&
                            typeof valuesArray[key] === 'object' &&
                            valuesArray[key].hasOwnProperty('_isAMomentObject')
                        ) {
                            mappedValues[filter] = moment(valuesArray[key]).format(
                                'YYYY-MM-DD',
                            );

                            return;
                        }

                        mappedValues[filter] = valuesArray[key];
                    });

                    await handleSubmit(mappedValues, form);
                }}
                validateOnBlur={false}
                ref = {ref}
            >
                {({
                    values,
                    errors,
                    submitCount,
                    isSubmitting,
                    handleChange,
                    setFieldValue,
                }) => (
                    <Form>
                        <Typography variant="h6" gutterBottom>
                            Create Order
                        </Typography>

                        {/* <Grid container spacing={24}> */}
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('client')
                                    }
                                >
                                    <InputLabel htmlFor="client">
                                        Client{' '}
                                        <span className={classes.required}>*</span>
                                    </InputLabel>

                                    {/* <Input
                                        id="client"
                                        name="client"
                                        value={values.client}
                                        onChange={handleChange}
                                        fullWidth
                                    /> */}
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        Select Client
                                    </Button>
                                    <Menu
                                        id="client"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        value={values.client}
                                        open={Boolean(anchorEl)}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        <MenuItem onClick={handleChange}>Profile</MenuItem>
                                        <MenuItem onClick={handleChange}>My account</MenuItem>
                                        <MenuItem onClick={handleChange}>Logout</MenuItem>
                                    </Menu>

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('name') && (
                                            <FormHelperText>
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* <Grid container spacing={24}> */}
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('company')
                                    }
                                >
                                    <InputLabel htmlFor="company">Company</InputLabel>

                                    <Input
                                        id="company"
                                        name="company"
                                        value={values.company}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('company') && (
                                            <FormHelperText>
                                                {errors.company}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('phone')
                                    }
                                >

                                <InputLabel htmlFor="phone">Phone</InputLabel>

                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('phone') && (
                                            <FormHelperText>
                                                {errors.phone}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* <Grid container spacing={24}> */}
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('email')
                                    }
                                >
                                    <InputLabel htmlFor="email">
                                        Email
                                    </InputLabel>

                                    <Input
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('email') && (
                                            <FormHelperText>
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div className={classes.sectionSpacer} />

                        {/* <Grid container spacing={24} justify="flex-end"> */}
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                        (errors &&
                                            Object.keys(errors).length > 0 &&
                                            submitCount > 0) ||
                                        isSubmitting
                                    }
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        );
        // switch (activeStep) {
        //     case 0:
        //         return (
        //             <Profile
        //                 {...other}
        //                 values={
        //                     formValues[0] ? formValues[0] : defaultProfileValues
        //                 }
        //                 handleSubmit={handleSubmit}
        //             />
        //         );
        //     case 1:
        //         return (
        //             <Address
        //                 {...other}
        //                 values={{
        //                     billing_address: '',
        //                     shipping_address: '',
        //                 }}
        //                 handleSubmit={handleSubmit}
        //                 handleBack={handleBack}
        //             />
        //         );
        //     case 2:
        //         return (
        //             <Others
        //                 {...other}
        //                 values={{
        //                     fax: '',
        //                     website: '',
        //                     open_balance:'',
        //                     note: '',
        //                 }}
        //                 handleSubmit={handleSubmit}
        //                 handleBack={handleBack}
        //             />
        //         );
        //     default:
        //         throw new Error('Unknown step!');
        // }
    };

    return (
        <MasterLayout
            {...other}
            pageTitle="Create a client"
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
                            Order Creation
                        </Typography>

                        {/* <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                        >
                            {steps.map(name => (
                                <Step key={name}>
                                    <StepLabel>{name}</StepLabel>
                                </Step>
                            ))}
                        </Stepper> */}

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
});

export default withStyles(styles)(Create);
