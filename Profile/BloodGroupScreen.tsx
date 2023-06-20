import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'
import { CustomPicker } from '../app/components';

import auth from '@react-native-firebase/auth';

export const BloodGroupScreen = ({ navigation }) => {
  const user = auth().currentUser;
  const [name, setName] = useState(user?.displayName);
  const [loader, setLoader] = useState<boolean>(false);

  async function updateBloodGroup(name: string) {
    setLoader(true);
    navigation.navigate('Profile');
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <CustomPicker
        items={[
          { label: 'A Negative', value: 'A-' },
          { label: 'A Positive', value: 'A+' },
          { label: 'B Negative', value: 'A-' },
          { label: 'B Positive', value: 'A+' },
          { label: 'AB Negative', value: 'A-' },
          { label: 'AB Positive', value: 'A+' },
          { label: 'O Negative', value: 'A-' },
          { label: 'O Positive', value: 'A+' }
        ]}
      />
      <Button title="Continue" onPress={() => updateBloodGroup(name)} />
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

export default BloodGroupScreen;
