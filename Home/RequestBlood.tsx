import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { CustomPicker } from '../app/components';
import { Button, CheckBox, Input, useTheme } from '@rneui/themed';
import { NavigationProps } from "../App";
import useRequestBloodForm, { For } from "./useRequestBloodForm"
import { BloodGroupOptions, ForOptions, MedicalConditionOptions } from "../Common"
import { ProfileData } from "../Profile"
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const RequestBlood = ({ navigation }: NavigationProps<'RequestBlood'>) => {
  const [selectedIndex, setIndex] = useState(0);
  const [checked, setChecked] = useState(true);
  const [profile, setProflie] = useState<ProfileData>();
  const { theme } = useTheme();

  const toggleCheckbox = () => setChecked(!checked);
  const { request, onPropertyChange, isSaveDisabled } = useRequestBloodForm();

  const user = auth().currentUser;

  database().ref('/users/' + user?.uid).once('value').then(snapshot => setProflie(snapshot.val()))
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>{JSON.stringify(request)}</Text>
      <CustomPicker
        label="Requesting for"
        value={request.for}
        onChange={(value: For) => onPropertyChange("for", value)}
        items={ForOptions}
      />
      {request.for !== "myself" &&
        <>
          <Input label="Patient Name" onChangeText={(value) => onPropertyChange("name", value)} />
          <CustomPicker
            label="Blood Group"
            value={request.bloodGroup}
            onChange={(value: string) => onPropertyChange("bloodGroup", value)}
            items={BloodGroupOptions}
          />
        </>
      }
      <Input keyboardType='numeric' label="No of Units" onChangeText={(value) => onPropertyChange("units", Number(value))} />
      <CustomPicker
        label="Medical Condition for"
        value={request.condition}
        onChange={(value: string) => onPropertyChange("condition", value)}
        items={MedicalConditionOptions}
      />
      <Input label="Hospital" onChangeText={(value) => onPropertyChange("hospital", value)} />
      <Input label="Hospital Pin" />
      {/* <CheckBox
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
      /> */}

      <CheckBox
        checked={checked}
        onPress={toggleCheckbox}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon={'checkbox-blank-outline'}
        title="I hereby accept all the terms and condition by BloodCircle.org"
        checkedColor={theme.colors.success}
        uncheckedColor={theme.colors.error}
      />
      <Button
        title="Next"
        disabled={isSaveDisabled || !checked}
        onPress={() => navigation.navigate('RequestBloodConfirmation')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 20
  }
});

export default RequestBlood;
