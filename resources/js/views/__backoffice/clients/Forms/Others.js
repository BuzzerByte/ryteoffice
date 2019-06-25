import React, { useState, useEffect } from 'react';
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

import { Dropzone } from '../../../../ui';

const Others = props => {
    const { classes, values, handleSubmit, handleBack, handleSkip } = props;

    return (
        <Formik
            initialValues={values}
            validationSchema={Yup.object().shape({
                
            })}
            onSubmit={handleSubmit}
            validateOnBlur={false}
        >
            {({ values, handleChange, errors, submitCount, isSubmitting }) => (
                <Form>
                    <Typography variant="h6" gutterBottom>
                        Others Settings
                    </Typography>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                className={classes.formControl}
                                error={
                                    submitCount > 0 &&
                                    errors.hasOwnProperty('open_balance')
                                }
                            >
                                <InputLabel htmlFor="open_balance">
                                    Open Balance{' '}
                                    <span className={classes.required}>*</span>
                                </InputLabel>

                                <Input
                                    id="open_balance"
                                    name="open_balance"
                                    value={values.open_balance}
                                    onChange={handleChange}
                                    input={<Input fullWidth />}
                                    fullWidth
                                >
                
                                </Input>

                                {submitCount > 0 &&
                                    errors.hasOwnProperty('open_balance') && (
                                        <FormHelperText>
                                            {errors.open_balance}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl
                                className={classes.formControl}
                                error={
                                    submitCount > 0 &&
                                    errors.hasOwnProperty('fax')
                                }
                            >
                                <InputLabel htmlFor="fax">
                                    Fax{' '}
                                    <span className={classes.required}>*</span>
                                </InputLabel>

                                <Input
                                    id="fax"
                                    name="fax"
                                    value={values.fax}
                                    onChange={handleChange}
                                    input={<Input fullWidth />}
                                    fullWidth
                                >
                
                                </Input>

                                {submitCount > 0 &&
                                    errors.hasOwnProperty('fax') && (
                                        <FormHelperText>
                                            {errors.fax}
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
                                    errors.hasOwnProperty('website')
                                }
                            >
                                <InputLabel htmlFor="website">
                                    Website{' '}
                                    <span className={classes.required}>*</span>
                                </InputLabel>

                                <Input
                                    id="website"
                                    name="website"
                                    value={values.website}
                                    onChange={handleChange}
                                    input={<Input fullWidth />}
                                    fullWidth
                                />

                                {submitCount > 0 &&
                                    errors.hasOwnProperty('website') && (
                                        <FormHelperText>
                                            {errors.website}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl
                                className={classes.formControl}
                                error={
                                    submitCount > 0 &&
                                    errors.hasOwnProperty('note')
                                }
                            >
                                <InputLabel htmlFor="website">
                                    Note{' '}
                                    <span className={classes.required}>*</span>
                                </InputLabel>

                                <Input
                                    id="note"
                                    name="note"
                                    value={values.note}
                                    onChange={handleChange}
                                    input={<Input fullWidth />}
                                    fullWidth
                                />

                                {submitCount > 0 &&
                                    errors.hasOwnProperty('note') && (
                                        <FormHelperText>
                                            {errors.note}
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
                                Finish
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

Others.propTypes = {
    values: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
};

const styles = theme => ({
    sectionSpacer: {
        marginTop: theme.spacing.unit * 2,
    },

    formControl: {
        minWidth: '100%',
    },

    required: {
        color: theme.palette.error.main,
    },

    backButton: {
        marginRight: theme.spacing.unit,
    },
});

export default withStyles(styles)(Others);
