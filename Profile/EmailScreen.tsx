import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'

import auth from '@react-native-firebase/auth';
import { handleFirebaseError } from './../firebase/FirebaseError';

export const EmailScreen = ({ navigation }) => {
    const user = auth().currentUser;
    const [email, setEmail] = useState(user?.email ?? undefined);
    const [loader, setLoader] = useState<boolean>(false);

    async function updateDisplayName(email?: string) {
        if (email) {
            setLoader(true);
            try {
                await user?.updateEmail(email);
                navigation.popToTop();
            } catch (error: any) {
                handleFirebaseError(error);
            }
            setLoader(false);
        }
    }

    return (<>
        <View style={styles.container}>
            <Input label="Email" placeholder="Enter Email" value={email} onChangeText={(text: string) => setEmail(text)} />
            <Button title="Submit" onPress={() => updateDisplayName(email)} />
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

export default EmailScreen;
