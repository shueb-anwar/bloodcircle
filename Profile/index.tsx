import React from 'react';
import { View } from 'react-native';
import { ListItem, Icon, Button } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import Colors from '../Theme/Colors';

const ProfilePage = ({ navigation }) => {
  const user = auth().currentUser;

  return (
    <View>
      <ListItem bottomDivider onPress={() => navigation.navigate('DisplayNameScreen')}>
        <Icon name="account-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Name</ListItem.Title>
          <ListItem.Subtitle>{user?.displayName}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('EmailScreen')}>
        <Icon name="email-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Email</ListItem.Title>
          <ListItem.Subtitle>{user?.email}</ListItem.Subtitle>
        </ListItem.Content>
        {user?.email && user.emailVerified === false ? <Button color="primary" title="Verify" onPress={() => user.sendEmailVerification()} /> : <ListItem.Chevron />}
      </ListItem>
      <ListItem bottomDivider>
        <Icon name="phone-classic" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Phone</ListItem.Title>
          <ListItem.Subtitle>{user?.phoneNumber}</ListItem.Subtitle>
        </ListItem.Content>
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
      <ListItem bottomDivider  onPress={() => navigation.navigate('DocumentScreen')}>
        <Icon
          name="calendar-month-outline"
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>Document</ListItem.Title>
          <ListItem.Subtitle>AROPA12345C</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('BloodGroupScreen')}>
        <Icon name="water-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Blood Group</ListItem.Title>
          <ListItem.Subtitle>A Negative</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('AddressScreen')}>
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
