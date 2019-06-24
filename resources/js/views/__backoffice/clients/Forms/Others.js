import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Grid, Typography, withStyles } from '@material-ui/core';

import { Dropzone } from '../../../../ui';

function Others(props) {
    const [files, setFiles] = useState([]);

    /**
     * Initial files to be fed to dropzone.
     *
     * @return {array}
     */
    const loadFiles = (reset = false) => {
        const { user } = props;

        if (!user.hasOwnProperty('filename')) {
            return;
        }

        if (user.filename === null) {
            return;
        }

        const files = [
            {
                name: user.original_filename,
                size: user.thumbnail_filesize,
                url: user.thumbnail_url,
                type: `image/${user.filename.split('.').reverse()[0]}`,
                status: 'uploaded',
            },
        ];

        setFiles(files);
    };

    /**
     * Handle the removal of files.
     *
     * @param {object} file The file that should be fed to the API.
     * @param {function} removed  When called, will inform that the file is removed.
     *
     * @return {undefined}
     */
    const handleFileRemoved = async (file, removed) => {
        const { user } = props;

        try {
            const response = await axios.delete(
                `api/v1/users/${user.id}/others`,
            );

            if (response.status !== 200) {
                removed(false, response.statusText);

                return;
            }

            removed(true);
        } catch (error) {
            if (!error.response) {
                removed(false, 'File not removed due to unknown error.');

                return;
            }

            removed(false, error.response.statusText);
        }
    };

    /**
     * Handle the file upload.
     *
     * @param {object} file The file that should be fed to the API.
     * @param {function} done When called, will inform that upload is done.
     *
     * @return {undefined}
     */
    const handleUpload = async (file, done) => {
        const { user } = props;

        try {
            const formData = new FormData();
            formData.append('others', file);

            const response = await fetch(`api/v1/users/${user.id}/others`, {
                method: 'POST',
                headers: {
                    Authorization:
                        axios.defaults.headers.common['Authorization'],
                    'X-CSRF-TOKEN':
                        axios.defaults.headers.common['X-CSRF-TOKEN'],
                },
                body: formData,
            });

            if (response.status !== 200) {
                done(false, response.statusText);
            }

            done(true);
        } catch (error) {
            if (!error.response) {
                removed(false, 'File not uploaded due to unknown error.');

                return;
            }

            removed(false, error.response.statusText);
        }
    };

    useEffect(() => {
        if (files.length > 0) {
            return;
        }

        loadFiles();
    });

    const { classes, handleSkip } = props;

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Other Informations Upload
            </Typography>

            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <FormControl
                        className={classes.formControl}
                        error={
                            submitCount > 0 &&
                            errors.hasOwnProperty('website')
                        }
                    >
                        <InputLabel htmlFor="website">Website</InputLabel>

                        <Input
                            id="website"
                            name="website"
                            value={values.website}
                            onChange={handleChange}
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
                            errors.hasOwnProperty('open_balance')
                        }
                    >

                    <InputLabel htmlFor="open_balance">Open Balance</InputLabel>

                        <Input
                            id="open_balance"
                            name="open_balance"
                            value={values.open_balance}
                            onChange={handleChange}
                            fullWidth
                        />

                        {submitCount > 0 &&
                            errors.hasOwnProperty('open_balance') && (
                                <FormHelperText>
                                    {errors.open_balance}
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
                            errors.hasOwnProperty('fax')
                        }
                    >
                        <InputLabel htmlFor="fax">Fax</InputLabel>

                        <Input
                            id="fax"
                            name="fax"
                            value={values.fax}
                            onChange={handleChange}
                            fullWidth
                        />

                        {submitCount > 0 &&
                            errors.hasOwnProperty('fax') && (
                                <FormHelperText>
                                    {errors.fax}
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

                    <InputLabel htmlFor="note">Note</InputLabel>

                        <Input
                            id="note"
                            name="note"
                            value={values.note}
                            onChange={handleChange}
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
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                    >
                        Finish
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

Others.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleSkip: PropTypes.func.isRequired,
};

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 10,
        border: `1px solid ${theme.palette.text.primary}`,
    },

    sectionSpacer: {
        marginTop: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(Others);
