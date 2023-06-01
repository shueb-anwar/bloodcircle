import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CustomPicker } from '../app/components';
import { Button, CheckBox, Input } from '@rneui/themed';

const RequestBlood = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('myself');
  const [selectedIndex, setIndex] = useState(0);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomPicker
        items={[
          { label: 'MySelf', value: 'myself' },
          { label: 'Friend', value: 'friend' },
          { label: 't', value: 't' }
        ]}
      />
      <Input label="Name" />
      <Input label="Blood Group" />
      <Input label="No of Units" />
      <Input label="Medical Condition" />
      <Input label="Hospital" />
      <Input label="Hospital Pin" />
      <CheckBox
        title="Appollo Hospital"
        checked={selectedIndex === 0}
        onPress={() => setIndex(0)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
      <CheckBox
        title="Holy family"
        checked={selectedIndex === 1}
        onPress={() => setIndex(1)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
      <CheckBox
        title="Moolchand"
        checked={selectedIndex === 2}
        onPress={() => setIndex(2)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
      <Button
        title="Next"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('RequestBloodConfirmation')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 20
  },
  button: {
    marginHorizontal: 10
  }
});

export default RequestBlood;
