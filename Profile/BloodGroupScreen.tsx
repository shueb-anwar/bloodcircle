import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'
import { CustomPicker } from '../app/components';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NavigationProps } from "../App";

export const BloodGroupScreen = ({ route, navigation }: NavigationProps<'BloodGroupScreen'>) => {
  const user = auth().currentUser;
  const { bloodGroup } = route.params;
  const [selectedValue, setSelectedValue] = useState(bloodGroup);
  const [loader, setLoader] = useState<boolean>(false);

  async function updateBloodGroup() {
    setLoader(true);
    database().ref('/users/' + user?.uid + '/bloodGroup').set(selectedValue);
    navigation.popToTop();
    setLoader(false);
  }

  return (<>
    <View style={styles.container}>
      <CustomPicker
        label="Select Blood Group"
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'A Negative', value: 'A-' },
          { label: 'A Positive', value: 'A+' },
          { label: 'B Negative', value: 'B-' },
          { label: 'B Positive', value: 'B+' },
          { label: 'AB Negative', value: 'AB-' },
          { label: 'AB Positive', value: 'AB+' },
          { label: 'O Negative', value: 'O-' },
          { label: 'O Positive', value: 'O+' }
        ]}
      />
      <Button title="Continue" onPress={() => updateBloodGroup()} />
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
