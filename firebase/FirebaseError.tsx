import { Alert } from 'react-native';

export interface FirebaseError {
    code: FirebaseCode,
    message: string
}

enum FirebaseCode {
    // "auth/app-deleted",
    // "auth/app-not-authorized",
    // "auth/argument-error",
    // "auth/invalid-api-key",
    // "auth/invalid-user-token",
    // "auth/invalid-tenant-id",
    // "auth/network-request-failed",
    // "auth/operation-not-allowed",
    RequiredRecentLogin = "auth/requires-recent-login",
    // "auth/too-many-requests",
    // "auth/unauthorized-domain",
    // "auth/user-disabled",
    // "auth/user-token-expired",
    // "auth/web-storage-unsupported"
}

export function handleFirebaseError(error: FirebaseError) {
    var err = "";
    switch (error.code) {
        case FirebaseCode.RequiredRecentLogin:
            err = "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
            break;
    }

    Alert.alert('Connection Error', err, [
        { text: 'Ok', style: 'cancel', },
    ]);
}
