import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { NavigationProps } from "../App";

function openMessage(navigation) {
  navigation.navigate('Message', {
    name: 'Jane'
  });
}

export const Messages = ({ navigation }: NavigationProps<'Messages'>) => {
  return (
    <ScrollView>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.userName}>John Doe</ListItem.Title>
          <ListItem.Subtitle>Donor ID: MBD0001</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem
        bottomDivider
        onPress={() => {
          openMessage(navigation);
        }}>
        <Icon name="label-important-outline" type="material" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Message from: Admin</ListItem.Title>
          <ListItem.Subtitle>22 January, 2022</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => {
          openMessage(navigation);
        }}>
        <Icon name="label-important-outline" type="material" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Message from: Admin</ListItem.Title>
          <ListItem.Subtitle>22 January, 2022</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ScrollView>
  );
};

export const Message = () => {
  return (
    <View>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.userName}>
            Blood Requested
          </ListItem.Title>
          <ListItem.Title>Name John Doe</ListItem.Title>
          <Text>DOB: 12 December, 1990</Text>
          <Text>Address: wertyuilo;</Text>
          <Text>Unit(s) Required: 3</Text>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    textAlign: 'left',
    fontSize: 40
  }
});
