import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NavigationProps } from "../App";

export const DobScreen = ({ route, navigation }: NavigationProps<'DobScreen'>) => {
  const user = auth().currentUser;
  const { dob } = route.params;
  const [value, setValue] = useState(dob);
  const [loader, setLoader] = useState<boolean>(false);

  async function updateDisplayName(value: string) {
    setLoader(true);
    database().ref('/users/' + user?.uid + '/dob').set(value);
    navigation.popToTop();
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <Input label="Date of Birth" placeholder="DD/MM/YYY" value={value} onChangeText={(text: string) => setValue(text)} />
      <Button title="Continue" onPress={() => updateDisplayName(value)} />
    </View>

    <Loading loading={loader} />
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  }
});

export default DobScreen;
