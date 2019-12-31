/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
* @format
 * @flow
 */


import React, { Component } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Platform,
    Button,
    ActivityIndicator,
    StatusBar,
    TouchableHighlight,
    TextInput,
    FlatList, ImageBackground,
    Image,
    TouchableOpacity

} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class ListKalawomanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

            Women: [],

        }
    }

    componentDidMount() {

        fetch(global.ServerUri + 'api/v1/home/women')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Women: responseJson.productTypes })

            })

            .catch((error) => {
                console.error(error);
            })
    }

    render() {


        return (
            <View style={
                { flex: 1, }}>
                <ScrollView>

                    <View style={{ marginTop: 16, marginLeft: 5, marginRight: 5 }}>

                        <FlatList numColumns={2} showsHorizontalScrollIndicator={false} data={this.state.Women}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, marginBottom: 20 }} >
                                    <TouchableOpacity style={styles.TouchableOpacityStyle}
                                        onPress={() => this.props.navigation.navigate('Product', { 'itemId': item.productTypeId })}>

                                        <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }} >
                                            <Image style={{ width: 181, height: 185, }}
                                                source={{ uri: (global.ServerUri + item.productTypeImage) }} />
                                            <Text style={styles.textpic}> {item.name}</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>)} keyExtractor={item => item.productTypeId.toString()} />
                    </View>
                </ScrollView>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    textpic: {
        fontSize: 25,
        borderTopWidth: 1,
        borderTopColor: '#E5E2E2',
        padding: 5,
        width: 181,
        height: 40,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 3,
        fontFamily: 'Kamran'
    },
    TouchableOpacityStyle: {
        borderColor: '#E5E2E2',
        borderWidth: 1,
        backgroundColor: "#FAFAFA",
        // padding: 7,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        maxWidth: 185

    }
});

export default ListKalawomanScreen;
