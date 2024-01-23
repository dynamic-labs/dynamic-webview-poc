import { useUser } from 'react-hooks';
import { View, Text } from 'react-native';

export const DisplayUser = () => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <View style={{ borderRadius: 6, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>{JSON.stringify(user, null, 2)}</Text>
    </View>
  );
};
