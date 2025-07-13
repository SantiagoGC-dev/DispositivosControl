import React, { useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import DeviceItem from './DeviceItem';
import { DevicesContext } from '../context/DevicesContext';

const DeviceList = () => {
  const { devices, loading, toggleDevice } = useContext(DevicesContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <DeviceItem device={item} onToggle={toggleDevice} />
      )}
      contentContainerStyle={{ padding: 8 }}
    />
  );
};

export default DeviceList;