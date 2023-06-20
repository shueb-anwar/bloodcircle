import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../Theme/Colors';

export function Loading({ loading = false }: { loading: boolean }) {
    // const [loader, setLoader] = useState<boolean>(loading);

    if (loading) {
        return (<View style={[styles.container, styles.activityIndicatorContainer]}>
            <ActivityIndicator
                animating={loading}
                size="large"
                color={Colors.theme}
            />
        </View>)
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 0.8,
        marginHorizontal: 5
    },
    activityIndicatorContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});
