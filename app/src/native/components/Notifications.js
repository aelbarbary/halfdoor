import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const NotificationListing = ({
  error,
  loading,
  notifications,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.notification({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Header
          title="Notifications"
          content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
        />

        <FlatList
          numColumns={2}
          data={notifications}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>1/6/2018</Text>
                  <Spacer size={15} />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button
                      block
                      bordered
                      small
                      onPress={() => onPress(item)}
                    >
                      <Text>Details</Text>
                    </Button>
                    <Button
                      block
                      bordered
                      small
                      onPress={() => onPress(item)}
                    >
                      <Text>Unlock</Text>
                    </Button>
                  </View>

                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

NotificationListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

NotificationListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default NotificationListing;
