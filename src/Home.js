import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
    const [weatherData, setWeatherData] = useState({});  // Initialize as an empty object
    const [search, setSearch] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Track whether the user has searched

    const fetchWeather = async () => {
        if (!search) return; // Don't make the API call if the search field is empty

        try {
            setShowLoader(true);
            setHasSearched(true);  // Mark that the user has searched
            let url = `https://open-weather13.p.rapidapi.com/city/${search.toLowerCase()}/EN`;

            const options = {
                headers: {
                    'x-rapidapi-key': '9647f571d1mshc4127e3887503f8p130f31jsnb219605264e3',
                    'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
                },
            };
            const response = await axios.get(url, options);
            setWeatherData(response.data);
            // console.warn(response.data);
            setShowLoader(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setShowLoader(false);
        }
    };

    function convertFahrenheitToCelsius(fahrenheit) {
        let celsius = (fahrenheit - 32) * 5 / 9;
        return Math.round(celsius);
    }

    const getFormattedTime = (timestamp) => {
        return moment.unix(timestamp).format('hh:mm A');
    };

    return (
        <LinearGradient
        colors={['#00C6FF', '#0072FF']}
        style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={'black'} />
      {/* 
            <View style={styles.headerBox}>
                <Text style={styles.header}>Weather App</Text>
            </View> */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    placeholder='Enter city name'
                    placeholderTextColor={'#003366'}
                    style={styles.searchBar}
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                />
                <TouchableOpacity
                    style={{ backgroundColor: '#E3F2FD', padding: 10, borderRadius: 9, marginLeft: 8, borderColor: '#E1D7B7', borderWidth: 1 }}
                    activeOpacity={0.5}
                    onPress={() => fetchWeather()}
                >
                    <Search color={'#003366'} size={23} />
                </TouchableOpacity>
            </View>

            {
                showLoader ?
                    <Loader />
                    :
                    hasSearched ? (
                        Object.keys(weatherData).length ? (
                            <View>
                                <LinearGradient
                                colors={['#B3CDE0', '#8ABAD3']}
                                style={styles.weatherInfo}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Image
                                            source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                                            style={styles.weatherIcon}
                                        />
                                    </View>

                                    <View style={styles.weatherInfoWrapper}>
                                        <Text style={styles.weatherDesc}>{weatherData.weather[0].description}</Text>
                                        <Text style={styles.tempText}>{convertFahrenheitToCelsius(weatherData.main.temp)}°</Text>
                                        <Text style={styles.feelsLikeText}>Feels like: {convertFahrenheitToCelsius(weatherData.main.feels_like)}°</Text>
                                        <Text style={styles.cityName}>Location: {weatherData.name}, {weatherData.sys.country}</Text>
                                    </View>
                                </LinearGradient>
                                <LinearGradient 
                                colors={['#B3CDE0', '#8ABAD3']}
                                style={styles.details}>
                                    <View>
                                        <Text style={styles.detailText}>Humidity: {weatherData.main.humidity}%</Text>
                                        <Text style={styles.detailText}>Wind: {weatherData.wind.speed} m/s</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.detailText}>
                                            Sunrise: {getFormattedTime(weatherData.sys.sunrise)}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            Sunset: {getFormattedTime(weatherData.sys.sunset)}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        ) : (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#E1D7B7', fontSize: 27 }}>No Data Found!!!</Text>
                            </View>
                        )
                    ) : (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text style={{ color: '#E1D7B7', fontSize: 20 }}>Please search for a city.</Text> */}
                        </View>
                    )
            }
        </LinearGradient>
    );
};

const Loader = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating={true} size={70} color={'#E1D7B7'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7C93C3',
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    headerBox: {
        backgroundColor: '#1E2A5E',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 12
    },
    header: {
        color: '#E1D7B7',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '600'
    },
    weatherInfo: {
        marginVertical: 10,
        backgroundColor: '#1E2A5E',
        paddingVertical: 15,
        flexDirection: 'row',
        borderRadius: 14,
    },
    weatherInfoWrapper: {
        flex: 1,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weatherDesc: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: '#002E5D',
        marginLeft: 10,
    },
    tempText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#002E5D',
        marginLeft: 10,
    },
    feelsLikeText: {
        fontSize: 17,
        color: '#002E5D',
        marginLeft: 10,
    },
    details: {
        marginVertical: 5,
        backgroundColor: '#1E2A5E',
        padding: 20,
        borderRadius: 14,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    detailText: {
        fontSize: 16,
        color: '#002E5D',
        marginBottom: 5,
    },
    searchBar: {
        borderColor: 'lightgrey',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#E3F2FD',
        paddingVertical: 10,
        flex: 1,
        color: '#003366',
        fontSize: 16
    },
    cityName:{
        color:'#002E5D',
        marginLeft:10,
        fontSize:16
    }
});

export default Home;
