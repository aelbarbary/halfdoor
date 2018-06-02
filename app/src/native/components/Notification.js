import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Button, View } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const NotificationView = ({
  error,
  notifications,
  notificationId,
}) => {
  // Error
  if (error) return <Error content={error} />;


  let notification = null;
  if (notificationId && notifications) {
    notification = notifications.find(item => parseInt(item.id, 10) === parseInt(notificationId, 10));
  }


  if (!notification) return <Error content={ErrorMessages.notification404} />;

  // Build Ingredients listing
  // const ingredients = notification.ingredients.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>{item}</Text>
  //   </ListItem>
  // ));

  // Build Method listing
  const method = notification.method.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: notification.image }} style={{ height: 100, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>{notification.title}</H3>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button style={{marginRight:5}}>
            <Text>
              Unlock
            </Text>
          </Button>
          <Button>
            <Text>
              Send Key
            </Text>
          </Button>
        </View>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this Notification</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{notification.body}</Text>
            </Body>
          </CardItem>
        </Card>

        {/* <Card>
          <CardItem header bordered>
            <Text>Ingredients</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {ingredients}
              </List>
            </Content>
          </CardItem>
        </Card> */}

        <Card>
          <CardItem header bordered>
            <Text>Method</Text>
          </CardItem>
          <CardItem>
            <List>
              {method}
            </List>

          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

NotificationView.propTypes = {
  error: PropTypes.string,
  notificationId: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

NotificationView.defaultProps = {
  error: null,
};

export default NotificationView;
