import React, { useState } from 'react';
import { Formik, Form, isEmptyArray } from 'formik';

import {
    Grid,
    Paper,
    Typography,
    Button,
    withStyles,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    TextField
} from '@material-ui/core';

import * as NavigationUtils from '../../../helpers/Navigation';
import { LinearIndeterminate } from '../../../ui/Loaders';
import { Master as MasterLayout } from '../layouts';
import { Inventory } from '../../../models';
import * as Yup from 'yup';

// function Create(props) {
const Create = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState([]);
    const [inventory, setInventory] = useState({});
    const [message, setMessage] = useState({});

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
            const inventory = await Inventory.store({ ...previousValues, ...values });

            // After persisting the previous values. Move to the next step...
            let newFormValues = [...formValues];
            newFormValues[activeStep] = values;

            setMessage({
                type: 'success',
                body: Lang.get('resources.created', {
                    name: 'Inventory',
                }),
                closed: () => setMessage({}),
            });
            
            history.push(
                NavigationUtils.route(
                    'inventories.resources.inventories.index',
                )
            );
            
            setLoading(false);
            setFormValues(newFormValues);
            setInventory(inventory);
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

    const renderForm = () => {
        const values = {
            name: '',
            model_no: '',
            in_house: '',
            image: '',
            s_price: '',
            s_information: '',
            p_price: '',
            p_information: '',
            category_id: '',
            tax_id:'',
            quantity: '',
            type: ''
        };

        return (
            <Formik
                initialValues={values}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required(
                        Lang.get('validation.required', {
                            attribute: 'name',
                        }),
                    ),
                })}
                onSubmit={async (values, form) => {
                    let mappedValues = {};
                    let valuesArray = Object.values(values);
                    console.log(values);
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
            >
                {({
                    values,
                    errors,
                    submitCount,
                    isSubmitting,
                    handleChange
                }) => (
                    <Form>
                        <Typography variant="h6" gutterBottom>
                            Inventory Information
                        </Typography>

                        {/* <Grid container spacing={24}> */}
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('name')
                                    }
                                >
                                    <InputLabel htmlFor="name">
                                        Name{' '}
                                        <span className={classes.required}>*</span>
                                    </InputLabel>

                                    <Input
                                        id="name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        fullWidth
                                    />

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
                                        errors.hasOwnProperty('model_no')
                                    }
                                >
                                    <InputLabel htmlFor="model_no">Model No.</InputLabel>

                                    <Input
                                        id="model_no"
                                        name="model_no"
                                        value={values.model_no}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('model_no') && (
                                            <FormHelperText>
                                                {errors.model_no}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('in_house')
                                    }
                                >

                                <InputLabel htmlFor="in_house">In House No.</InputLabel>

                                    <Input
                                        id="in_house"
                                        name="in_house"
                                        value={values.in_house}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('in_house') && (
                                            <FormHelperText>
                                                {errors.in_house}
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
                                        errors.hasOwnProperty('image')
                                    }
                                >
                                    <InputLabel htmlFor="image">
                                        Image
                                    </InputLabel>

                                    <Input
                                        id="image"
                                        name="image"
                                        value={values.image}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('image') && (
                                            <FormHelperText>
                                                {errors.image}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('category_id')
                                    }
                                >
                                    <InputLabel htmlFor="category_id">
                                        Category
                                    </InputLabel>

                                    <Input
                                        id="category_id"
                                        name="category_id"
                                        value={values.category_id}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('category_id') && (
                                            <FormHelperText>
                                                {errors.category_id}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('s_price')
                                    }
                                >
                                    <InputLabel htmlFor="s_price">
                                        Sale Price
                                    </InputLabel>

                                    <Input
                                        id="s_price"
                                        name="s_price"
                                        value={values.s_price}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('s_price') && (
                                            <FormHelperText>
                                                {errors.s_price}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('s_information')
                                    }
                                >
                                    <InputLabel htmlFor="s_information">
                                        Sale Information
                                    </InputLabel>

                                    <Input
                                        id="s_information"
                                        name="s_information"
                                        value={values.s_information}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('s_information') && (
                                            <FormHelperText>
                                                {errors.s_information}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('p_price')
                                    }
                                >
                                    <InputLabel htmlFor="p_price">
                                        Purchase Price
                                    </InputLabel>

                                    <Input
                                        id="p_price"
                                        name="p_price"
                                        value={values.p_price}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('p_price') && (
                                            <FormHelperText>
                                                {errors.p_price}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('p_information')
                                    }
                                >
                                    <InputLabel htmlFor="p_information">
                                        Purchase Information
                                    </InputLabel>

                                    <Input
                                        id="p_information"
                                        name="p_information"
                                        value={values.p_information}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('p_information') && (
                                            <FormHelperText>
                                                {errors.p_information}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('tax_id')
                                    }
                                >
                                    <InputLabel htmlFor="tax_id">
                                        Tax
                                    </InputLabel>

                                    <Input
                                        id="tax_id"
                                        name="tax_id"
                                        value={values.tax_id}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('tax_id') && (
                                            <FormHelperText>
                                                {errors.tax_id}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('quantity')
                                    }
                                >
                                    <InputLabel htmlFor="quantity">
                                        Quantity
                                    </InputLabel>

                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        value={values.quantity}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('quantity') && (
                                            <FormHelperText>
                                                {errors.quantity}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl
                                    className={classes.formControl}
                                    error={
                                        submitCount > 0 &&
                                        errors.hasOwnProperty('type')
                                    }
                                >
                                    <InputLabel htmlFor="type">
                                        Type
                                    </InputLabel>

                                    <Input
                                        id="type"
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        fullWidth
                                    />

                                    {submitCount > 0 &&
                                        errors.hasOwnProperty('type') && (
                                            <FormHelperText>
                                                {errors.type}
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
                                    Submit
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
            pageTitle="Create a inventory"
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
                            Inventory Creation
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
