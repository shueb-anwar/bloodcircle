import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@rneui/themed';

interface Item {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string | undefined;
  onChange: (value: any) => void;
  items: Item[]
}
export const CustomPicker = ({ label, items, value, onChange }: Props) => {
  const {theme} = useTheme()
  return (
    <View>
      <Text style={{color: theme.colors.grey3, paddingBottom: 5, fontSize: 16}}>{label}</Text>
      <View style={[styles.pickerContainer, {borderColor: theme.colors.grey3}]}>
        <Picker
          selectedValue={value}
          style={[styles.picker]}
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
          {items.map(item => {
            return (
              <Picker.Item key={item.label} label={item.label} value={item.value} />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 25,
    borderWidth: 1
  },
  picker: {
    height: 45,
    width: '100%'
  }
});
