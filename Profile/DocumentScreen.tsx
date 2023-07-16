import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'
import { CustomPicker } from '../app/components';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const DocumentScreen = ({ route, navigation }) => {
  const user = auth().currentUser;
  const { document } = route.params;
  const [name, setName] = useState(document);
  const [loader, setLoader] = useState<boolean>(false);


  async function updateDisplayName(name?: string) {
    setLoader(true);
    database().ref('/users/' + user?.uid + '/document').set(name);
    navigation.popToTop();
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <CustomPicker
        items={[
          { label: 'Aadhar card', value: 'aadhar' },
          { label: 'Pan Card', value: 'pan' },
          { label: 'Passport', value: 'passport' }
        ]}
      />
      <Input label="Document Number" placeholder="Enter Document Number" value={name} onChangeText={(text: string) => setName(text)} />
      <Button title="Continue" onPress={() => updateDisplayName(name)} />
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

export default DocumentScreen;
