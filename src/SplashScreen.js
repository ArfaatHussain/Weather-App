import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#00C6FF', '#0072FF']} // Background gradient colors
      style={styles.container}
    >
      <View style={{flex:2.6,justifyContent:'center',alignItems:'center'}} >


        <Image
          source={{ uri: 'https://cdn2.iconfinder.com/data/icons/weather-365/64/weather-sun-cloud-rain-1024.png' }}
          style={styles.image}
        />

        <Text style={{color:'#E3F2FD',fontSize:25,fontWeight:'600',fontStyle:'italic'}}  >Find Weather of any City </Text>

      </View>

      <View style={{flex:1,justifyContent:'flex-end',paddingBottom:'15%'}}>


        <TouchableOpacity
        activeOpacity={0.6}
          style={styles.button}
          onPress={() => navigation.navigate('Home')} // Navigate to the home screen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 14,
    borderRadius: 15,
    marginHorizontal:'10%',

  },
  buttonText: {
    fontSize: 16,
    color: '#003366',
    textAlign:'center'
  },
});

export default SplashScreen;
