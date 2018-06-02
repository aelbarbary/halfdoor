import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNotifications, getMeals, setError } from '../actions/notifications';

class NotificationListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    notifications: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      notifications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getNotifications: PropTypes.func.isRequired,
    getMeals: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchNotifications();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchNotifications = () => {
    return this.props.getNotifications()
      .then(() => this.props.getMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, notifications, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        notificationId={id}
        error={notifications.error}
        loading={notifications.loading}
        notifications={notifications.notifications}
        reFetch={() => this.fetchNotifications()}
      />
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications || {},
});

const mapDispatchToProps = {
  getNotifications,
  getMeals,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListing);
