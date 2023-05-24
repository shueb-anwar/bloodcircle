import React from 'react';
import { View } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';

export const ProfilePage = () => {
  return (
    <View>
      <ListItem bottomDivider>
        <Icon name="account-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Name</ListItem.Title>
          <ListItem.Subtitle>Shueb Anwar</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon name="email-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Email</ListItem.Title>
          <ListItem.Subtitle>shueb.anwar@gmail.com</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon name="phone-classic" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Phone</ListItem.Title>
          <ListItem.Subtitle>07552667956</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon
          name="calendar-month-outline"
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>DOB</ListItem.Title>
          <ListItem.Subtitle>June 25, 1989</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon name="water-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Blood Group</ListItem.Title>
          <ListItem.Subtitle>A Negative</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon
          name="map-marker-outline"
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>Address</ListItem.Title>
          <ListItem.Subtitle>
            0606, KM32, Jaypee Kosmos, Sector 134, Noida
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

export default ProfilePage;
