import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

export default function ResponsiveContainer({ children, maxWidth = 800, style, ...props }) {
  return (
    <View 
      style={[
        styles.container,
        { maxWidth },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      marginHorizontal: 'auto',
      width: '100%',
      minHeight: '100vh',
      overflowX: 'hidden',
    }),
  },
});
