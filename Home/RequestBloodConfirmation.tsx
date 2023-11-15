import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Button, Card, CheckBox } from '@rneui/themed';
import { NavigationProps } from "../App";

const RequestBloodConfirmation = ({ navigation }: NavigationProps<'RequestBloodConfirmation'>) => {
  const [checked, setChecked] = useState(true);

  const toggleCheckbox = () => setChecked(!checked);

  return (
    <ScrollView>
      <View style={styles.view}>
        <Text>
          Dear Shuaib, Your request of 2 Units is initiated for collecting at
          Appolo Hospital. You will eligible if someone accept.
        </Text>
        <Text>Please read the policy to confirm.</Text>

        <CheckBox
          checked={checked}
          onPress={toggleCheckbox}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
          title="I hereby accept all the terms and condition by BloodCircle.org"
        />

        <Card containerStyle={styles.warning}>
          <Text>Lawful warning</Text>
        </Card>

        <Button
          title="Submit Request"
          buttonStyle={styles.button}
          disabled={!checked}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 20,
    paddingVertical: 20
  },
  button: {
    marginHorizontal: 0
  },
  warning: {
    marginHorizontal: 0,
    marginBottom: 20
  }
});

export default RequestBloodConfirmation;
