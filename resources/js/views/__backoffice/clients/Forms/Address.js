import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    withStyles,
} from '@material-ui/core';

const Address = props => {
    const { classes, values, handleSubmit, handleBack } = props;

    return (
        <Formik
            initialValues={values}
            validationSchema={Yup.object().shape({
                shipping_address: Yup.string().required(
                    Lang.get('validation.required', {
                        attribute: 'shipping_address',
                    }),
                ),
                billing_address: Yup.string().required(
                    Lang.get('validation.required', {
                        attribute: 'billing_address',
                    }),
                ),
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
        >
            {({ values, handleChange, errors, submitCount, isSubmitting }) => (
                <Form>
                    <Typography variant="h6" gutterBottom>
                        Address Settings
                    </Typography>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            <FormControl
                                className={classes.formControl}
                                error={
                                    submitCount > 0 &&
                                    errors.hasOwnProperty('shipping_address')
                                }
                            >
                                <InputLabel htmlFor="shipping_address">
                                    Shipping Address{' '}
                                    <span className={classes.required}>*</span>
                                </InputLabel>

                                <Input
                                    id="shipping_address"
                                    name="shipping_address"
                                    value={values.shipping_address}
                                    onChange={handleChange}
                                    input={<Input fullWidth />}
                                    multiline
                                    rows = {3}
                                >
                
                                </Input>

                                {submitCount > 0 &&
                                    errors.hasOwnProperty('shipping_address') && (
                                        <FormHelperText>
                                            {errors.shipping_address}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            <FormControl
                                className={classes.formControl}
                                error={
                                    submitCount > 0 &&
                                    errors.hasOwnProperty('billing_address')
                                }
                            >
                                <InputLabel htmlFor="billing_address">
                                    Billing Address{' '}
                                    <span className={classes.required}>*</span>
                                </InputLabel>

                                <Input
                                    id="billing_address"
                                    name="billing_address"
                                    value={values.billing_address}
                                    onChange={handleChange}
                                    input={<Input fullWidth />}
                                    multiline
                                    rows = {3}
                                />

                                {submitCount > 0 &&
                                    errors.hasOwnProperty('billing_address') && (
                                        <FormHelperText>
                                            {errors.billing_address}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <div className={classes.sectionSpacer} />

                    <Grid container spacing={24} justify="flex-end">
                        <Grid item>
                            <Button
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>

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
};

Address.propTypes = {
    values: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const styles = theme => ({
    sectionSpacer: {
        marginTop: theme.spacing(1) * 2,
    },

    formControl: {
        minWidth: '100%',
    },

    required: {
        color: theme.palette.error.main,
    },

    backButton: {
        marginRight: theme.spacing(1),
    },
});

export default withStyles(styles)(Address);
