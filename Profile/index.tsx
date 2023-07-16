import React from 'react';
import { View } from 'react-native';
import { ListItem, Icon, Button } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Address} from "./useAddressValidation"
interface UserData {
  address: Address;
  document: string;
  bloodGroup: string;
  dob: string;
}
const ProfilePage = ({ navigation }) => {
  const [userData, setUserData] = React.useState<UserData>();

  const user = auth().currentUser;
  database().ref('/users/' + user?.uid).once('value')
    .then(snapshot => setUserData(snapshot.val()))

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
      <ListItem bottomDivider  onPress={() => 
          navigation.navigate('DobScreen', { dob: userData?.dob})}
        >
        <Icon
          name="calendar-month-outline"
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>DOB</ListItem.Title>
          <ListItem.Subtitle>{userData?.dob}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => 
        navigation.navigate('DocumentScreen', { document: userData?.document})}
      >
        <Icon
          name="calendar-month-outline"
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>Document</ListItem.Title>
          <ListItem.Subtitle>{userData?.document}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('BloodGroupScreen', {bloodGroup: userData?.bloodGroup})}>
        <Icon name="water-outline" type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Blood Group</ListItem.Title>
          <ListItem.Subtitle>{userData?.bloodGroup}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('AddressScreen', { address: JSON.stringify(userData?.address)})}>
        <Icon
          name="map-marker-outline"
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>Address</ListItem.Title>
          <ListItem.Subtitle>
            {userData?.address.address}{', '}
            {userData?.address.state}{', '}
            {userData?.address.city}{', '}
            {userData?.address.pin}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

export default ProfilePage;
