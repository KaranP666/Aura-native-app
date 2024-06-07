
import { Text, View } from 'react-native'
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-3xl font-pblock'>Aora!</Text>
      <Link href="/profile">Go to Profile</Link>
    </View>
    
  );
}

