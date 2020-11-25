import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
    Paper,
    Typography,
    withStyles,
    Menu,
    MenuItem,
    Button,
    Grid,
    FormControl,
    FormHelperText,
    Input,
    InputLabel
} from '@material-ui/core';

import * as NavigationUtils from '../../../helpers/Navigation';
import { User } from '../../../models';
import { LinearIndeterminate } from '../../../ui/Loaders';
import { Master as MasterLayout } from '../layouts';
import { Order } from '../../../models';
import { Profile, Address, Others } from './Forms';

const Create = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState([]);
    const [order, setOrder] = useState({});
    const [message, setMessage] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const { history, classes, values, ...other } = props;

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    /**
     * This should return back to the previous step.
     *
     * @return {undefined}
     */
    // const handleBack = () => {
    //     setActiveStep(activeStep - 1);
    // };

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
            
            const order = await Order.store({ ...previousValues, ...values });

            // After persisting the previous values. Move to the next step...
            let newFormValues = [...formValues];
            setMessage({
                type: 'success',
                body: Lang.get('resources.created', {
                    name: 'Order',
                }),
                closed: () => setMessage({}),
            });
            
            history.push(
                NavigationUtils.route(
                    'orders.resources.orders.index',
                )
            );
            
            setLoading(false);
            setFormValues(newFormValues);
            setOrder(order);
        } catch (error) {
            if (!error.response) {
                throw new Error('Unknown error');
            }

            const { errors } = error.response.data;

            setErrors(errors);

            setLoading(false);
        }
    };

    /**
     * This should send an API request to fetch all resource.
     *
     * @param {object} params
     *
     * @return {undefined}
     */
    const fetchData = () => {
        setLoading(true);

        try {
            const pagination = await Order.create();
            setLoading(false);
            setMessage({});
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    });
    
    const renderForm = () => {
        
        const values = {
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
                                        errors.hasOwnProperty('order')
                                    }
                                >
                                    <Button aria-controls="client-menu" aria-haspopup="true" onClick={handleClick}>
                                        Select Client
                                    </Button>
                                    <Menu

                                        id="client-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        value = {values.client_id}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
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

                        
                        {/* <Grid container>
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
                        </Grid> */}

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
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        );
    };

    return (
        <MasterLayout
            {...other}
            pageTitle="Create an order"
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
                            Create Order
                        </Typography>

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
