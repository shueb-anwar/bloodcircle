import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'

import auth from '@react-native-firebase/auth';

export const DisplayNameScreen = ({ navigation }) => {
  const user = auth().currentUser;
  const [name, setName] = useState(user?.displayName);
  const [loader, setLoader] = useState<boolean>(false);

  async function updateAddress(name: string) {
    setLoader(true);
    navigation.navigate('Profile');
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <Input label="Address Line 1" placeholder="Enter your address" />
      <Input label="State" placeholder="Select State" />
      <Input label="City" placeholder="Enter city" />
      <Input label="Pin" placeholder="Pin Code" />
      <Button title="Continue" onPress={() => updateAddress(name)} />
    </View>

    <Loading loading={loader} />
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 20
  },
  button: { marginHorizontal: 10 },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  col: { flex: 1 }
});

export default DisplayNameScreen;
