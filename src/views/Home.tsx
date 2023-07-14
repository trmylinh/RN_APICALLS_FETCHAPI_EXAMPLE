/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getListPhotos();
        return () => {

        };
    }, []);
    const getListPhotos = () => {
        const apiURL = 'https://jsonplaceholder.typicode.com/photos';
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                setData(resJson);
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
            .finally(() => setIsLoading(false));
    };
    const renderItem = ({item} : any) => {
        return (
            <View style={styles.item}>
                <Image
                    style={styles.image}
                    source={{uri: item.url}}
                    resizeMode="contain"
                />
                <View style={styles.wrapText}>
                    <Text>{item.title}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.getView}>
                <Text>Fetch API</Text>
            </TouchableOpacity> */}
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    style={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item: any)=> item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    getView: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    list: {
        padding: 10,
        flex: 1,
    },
    item:{
        flexDirection: 'row',
        marginTop: 10,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOpacity: 0.25,
    },
    image:{
        width: 100,
        height: 100,
    },
    wrapText:{
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
});

