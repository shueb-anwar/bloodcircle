import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';

const SignupScreen = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <Input label="Name" placeholder="Enter name" />
      {/* <Input label="Father" placeholder="Enter your father name" /> */}
      <View style={styles.row}>
        <View style={[styles.col, { flex: 0.5 }]}>
          <Input label="ID Type" placeholder="ID" />
        </View>
        <View style={styles.col}>
          <Input label="ID Number" placeholder="Enter ID Number" />
        </View>
      </View>
      <Input label="DOB" placeholder="Select DOB" />
      <Input label="Email" placeholder="Enter Email" />
      <Input label="Address" placeholder="Enter your address" />
      <Input label="State" placeholder="Select State" />
      <View style={styles.row}>
        <View style={styles.col}>
          <Input label="City" placeholder="Enter city" />
        </View>
        <View style={[styles.col, { flex: 0.5 }]}>
          <Input label="Pin" placeholder="Pin Code" />
        </View>
      </View>
      <Input label="Blood Group" placeholder="Select your blood group" />
      <Button
        title="Submit"
        onPress={() => navigation.navigate('Home')}
        buttonStyle={styles.button}
        containerStyle={{ width: '100%' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 20
  },
  button: { marginHorizontal: 10 },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  col: { flex: 1 }
});

export default SignupScreen;
