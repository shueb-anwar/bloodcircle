import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'

import auth from '@react-native-firebase/auth';

export const DisplayNameScreen = ({navigation}) => {
  const user = auth().currentUser;
  const [name, setName] = useState(user?.displayName);
  const [loader, setLoader] = useState<boolean>(false);

  async function updateDisplayName(name: string) {
    setLoader(true);
    await user?.updateProfile({displayName: name});
    navigation.navigate('Profile');
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <Input label="Display Name" placeholder="Enter Display Name" value={name} onChangeText={(text: string) => setName(text)} />
        <Button title="Continue" onPress={() => updateDisplayName(name)} />
    </View>

    <Loading loading={loader}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  }
});

export default DisplayNameScreen;
