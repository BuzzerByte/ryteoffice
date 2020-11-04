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

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

// const Profile = props => {
const Profile = React.forwardRef((props, ref) => {
    const { classes, values, handleSubmit } = props;

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
                        Client Information
                    </Typography>

                    <Grid container spacing={24}>
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

                    <Grid container spacing={24}>
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

                    <Grid container spacing={24}>
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

                    <Grid container spacing={24} justify="flex-end">
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
});

Profile.propTypes = {
    values: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const styles = theme => ({
    formControl: {
        minWidth: '100%',
    },

    required: {
        color: theme.palette.error.main,
    },
});

export default withStyles(styles)(Profile);
