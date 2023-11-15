import useSWR from 'swr'
import database from '@react-native-firebase/database';
import { ProfileData } from "./"

const fetcher = (node: string) => database().ref(node).once('value').then(snapshot => snapshot.val());

function useProfile(uid?: string) {
  const { data, error, isLoading } = useSWR<ProfileData>('/users/' + uid, fetcher, { suspense: true })

  return {
    profile: data!,
    isLoading,
    isError: error
  }
}

export default useProfile;