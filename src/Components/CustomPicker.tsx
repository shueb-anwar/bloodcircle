import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const CustomPicker = ({ items }) => {
  const [selectedValue, setSelectedValue] = useState('myself');

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={[styles.picker]}
        onValueChange={itemValue => setSelectedValue(itemValue)}>
        {items.map(item => {
          return (
            <Picker.Item key={item} label={item.label} value={item.value} />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderColor: '#999',
    borderWidth: 1
  },
  picker: {
    height: 45,
    width: '100%'
  }
});
