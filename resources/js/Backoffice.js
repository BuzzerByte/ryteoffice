import React, { Component, Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { withWidth, CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { Navigator } from './core';
import { ROUTES } from './config';
import { dark as darkTheme, light as lightTheme } from './themes/backoffice';
import { Loading } from './views';

class Backoffice extends Component {
    state = {
        loading: true,
        navigating: true,
        authenticated: false,
        nightMode: false,
        token: {},
        user: {},
        username: '',
    };

    /**
     * Refresh the user's session.
     *
     * @return {undefined}
     */
    refresh = async () => {
        this.setState({ navigating: true });

        try {
            const response = await axios.post('/api/auth/refresh');
            const token = response.data;

            this.setToken(token);

            this.setState(prevState => {
                return {
                    navigating: false,
                    token,

                    // Update the user's auth_token after refreshing it in the API
                    user: {
                        ...prevState.user,
                        auth_token: token.auth_token,
                    },
                };
            });
        } catch (error) {}
    };

    /**
     * Authenticate the user.
     *
     * @param {string} tokenString
     *
     * @return {undefined}
     */
    authenticate = async tokenString => {
        const token = JSON.parse(tokenString);

        if (token) {
            this.setToken(token);

            await this.fetchUser();
        }
    };

    /**
     * Sign out user.
     *
     * @return {undefined}
     */
    signout = async () => {
        this.setState({ loading: true });

        try {
            const response = await axios.post('/api/auth/signout');

            if (response.status === 200) {
                // remove token data stored in localStorage.
                await localStorage.removeItem('token');

                this.setState({
                    loading: false,
                    authenticated: false,
                    user: {},
                });
            }
        } catch (error) {}
    };

    /**
     * Handle nightmode toggle.
     * Store boolean value in persistent storage.
     *
     * @return {undefined}
     */
    handleNightmodeToggled = () => {
        this.setState(prevState => {
            return {
                nightMode: !prevState.nightMode,
            };
        });

        if (!this.state.nightMode) {
            window.localStorage.setItem('nightMode', true);
        } else {
            window.localStorage.removeItem('nightMode');
        }
    };

    /**
     * Sign out the user, but retain the username.
     *
     * @param {string} username
     *
     * @return {undefined}
     */
    handleLock = async username => {
        await this.setState({
            username,
        });

        await this.signout();
    };

    /**
     * Sign out user completely.
     *
     * @return {undefined}
     */
    handleSignout = async () => {
        await this.signout();
    };

    /**
     * Set nightmode based on stored value in persistent storage.
     *
     * @return {undefined}
     */
    setNightMode = () => {
        const nightMode = window.localStorage.getItem('nightMode');

        this.setState({
            nightMode: nightMode ? true : false,
        });
    };

    /**
     * Get the Authentication Data from the persistent storage.
     *
     * @return {object}
     */
    token = () => {
        const tokenString = window.localStorage.getItem('token');

        if (!tokenString) {
            return {};
        }

        const token = JSON.parse(tokenString);

        this.setState({ token });

        return token;
    };

    /**
     * Store the authentication object as string into a persistent storage.
     *
     * @param {object} token
     *
     * @return {undefined}
     */
    setToken = token => {
        // We will set a default Authorization header, this will
        // eliminate the need to include the Authorization header
        // for almost every AJAX requests.
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${
            token.auth_token
        }`;

        // Store it locally for the authentication token to persist.
        window.localStorage.setItem('token', JSON.stringify(token));
    };

    /**
     * Fetch the authenticated user.
     *
     * @return {undefined}
     */
    fetchUser = async () => {
        this.setState({ loading: true });

        try {
            const response = await axios.post('/api/auth/user');

            if (response.status === 200) {
                this.setState({
                    loading: false,
                    authenticated: true,
                    user: response.data,
                });
            }
        } catch (error) {}
    };

    async componentDidMount() {
        this.setNightMode();

        const token = this.token();

        if (token) {
            await this.authenticate(JSON.stringify(token));
        }

        this.setState({ loading: false, navigating: false });
    }

    render() {
        const { width } = this.props;
        const { loading, nightMode } = this.state;

        const renderLoading = (
            <Loading
                pageProps={{
                    ...this.state,
                }}
            />
        );

        return (
            <MuiThemeProvider theme={nightMode ? darkTheme : lightTheme}>
                <CssBaseline />

                {loading ? (
                    renderLoading
                ) : (
                    <Router>
                        <Suspense fallback={renderLoading}>
                            <Navigator
                                pageProps={{
                                    ...this.state,
                                    width,
                                    environment: 'backoffice',
                                    routes: ROUTES,
                                    handleNightmodeToggled: this
                                        .handleNightmodeToggled,
                                    refresh: this.refresh,
                                    authenticate: this.authenticate,
                                    handleLock: this.handleLock,
                                    handleSignout: this.handleSignout,
                                }}
                            />
                        </Suspense>
                    </Router>
                )}
            </MuiThemeProvider>
        );
    }
}

export default withWidth()(Backoffice);
