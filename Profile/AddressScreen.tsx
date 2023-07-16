import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'
import useAdderssForm from './useAdderssForm';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const DisplayNameScreen = ({ route, navigation }) => {
  const user = auth().currentUser;
  const { address: currentAddress } = route.params;
  const [loader, setLoader] = useState<boolean>(false);
  const { address, errors, isSaveDisabled, onPropertyChange } = useAdderssForm(JSON.parse(currentAddress))

  async function updateAddress() {
    setLoader(true);
    database().ref('/users/' + user?.uid + '/address').set(address);
    navigation.popToTop();
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <Input label="Address Line 1" placeholder="Enter your address" value={address.address}
        onChangeText={(value) => onPropertyChange('address', value)}
        errorMessage={errors.address}
      />
      <Input label="State" placeholder="Select State" value={address.state}
        onChangeText={(value) => onPropertyChange('state', value)}
        errorMessage={errors.state} 
      />
      <Input label="City" placeholder="Enter city" value={address.city}
        onChangeText={(value) => onPropertyChange('city', value)}
        errorMessage={errors.city} 
      />
      <Input label="Pin" placeholder="Pin Code" value={address.pin}
        onChangeText={(value) => onPropertyChange('pin', value)}
        errorMessage={errors.pin} 
      />
      <Button title="Continue" onPress={() => updateAddress()} disabled={isSaveDisabled} />
    </View>

    <Loading loading={loader} />
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 20
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  col: { flex: 1 }
});

export default DisplayNameScreen;
