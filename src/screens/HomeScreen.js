/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
* @format
 * @flow
 */

//import Drawer from 'react-native-drawer'
//import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import { BackgroundCarousel } from '../component/BackgroundCarousel';
import { Header, Right, Icon, Left } from 'native-base';



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
    TouchableOpacity,
    TextInput,
    FlatList, ImageBackground, AsyncStorage,
    Image

} from 'react-native';

import {

    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        
        this.state = {

            Women: [],
            Men: [],
            Kids: [],
            offer: [],

        }

    }

    componentDidMount() {

        // if (uri === undefined) { alert(global.ServerUri) }
        // else {
        fetch(global.ServerUri + 'api/v1/home/offers')
            .then((response) => response.json())
            .then((responseJson) => {

                const statusCode = responseJson.status;
                const ImagesF = [];
                responseJson.offers.forEach(img => ImagesF.push(`${global.ServerUri}${img.offerImage}`));

                this.setState({ offer: ImagesF })
                // console.log(offer);
            })

            .catch((error) => {
                console.error(error);
            });

        fetch(global.ServerUri + 'api/v1/home/women')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Women: responseJson.productTypes })

            })

            .catch((error) => {
                console.error(error);
            });

        fetch(global.ServerUri + 'api/v1/home/men')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Men: responseJson.productTypes })
            })
            .catch((error) => {
                console.error(error);
            });

        fetch(global.ServerUri + 'api/v1/home/Kids')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Kids: responseJson.productTypes })
            })
            .catch((error) => {
                console.error(error);
            });
        // }
    }
    render() {


        // if (!this.state.offer.length) return <ActivityIndicator />

        return (
            <View style={{ flex: 1, backgroundColor: "#F7F7F7" ,}}>
                <ScrollView>
                    <View>
                        <BackgroundCarousel images={this.state.offer} />
                    </View>

                    <View style={{ marginBottom: 30, }}>
                        <Text style={{ fontSize: 30, textAlign: "center",fontFamily:"343a5dddcff7f1cbb08d964cc275cb50ce721215011931", marginBottom: 30 }}>بانوان</Text>
                        <FlatList horizontal showsHorizontalScrollIndicator={false} data={this.state.Women}
                            renderItem={({ item }) => (
                                <View >
                                    <TouchableOpacity style={styles.TouchableOpacityStyle}
                                        onPress={() => this.props.navigation.navigate('Product', { 'itemId': item.productTypeId })}>

                                        <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }} >
                                            <Image style={{ width: 200, height: 150, }}
                                                source={{ uri: (global.ServerUri + item.productTypeImage) }} />
                                            <Text style={styles.textpic}> {item.name}</Text>
                                        </View>

                                    </TouchableOpacity>

                                </View>)} keyExtractor={item => item.productTypeId.toString()} />
                    </View>

                    <View style={{ marginBottom: 30, }}>
                        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 30,fontFamily:"343a5dddcff7f1cbb08d964cc275cb50ce721215011931", }}>آقایان</Text>
                        <FlatList horizontal showsHorizontalScrollIndicator={false} data={this.state.Men}
                            renderItem={({ item }) => (
                                <View >
                                    <TouchableOpacity style={styles.TouchableOpacityStyle}
                                        onPress={() => this.props.navigation.navigate('Product', { 'itemId': item.productTypeId })}>
                                        <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }} >
                                            <Image style={{ width: 200, height: 150, }} source={{ uri: (global.ServerUri + item.productTypeImage) }} />
                                            <Text style={styles.textpic}> {item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)} keyExtractor={item => item.productTypeId.toString()} />
                    </View>

                    <View style={{ marginBottom: 30, }}>
                        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 30 }}>کودکان</Text>
                        <FlatList horizontal showsHorizontalScrollIndicator={false} data={this.state.Kids}
                            renderItem={({ item }) => (
                                <View >
                                    <TouchableOpacity style={styles.TouchableOpacityStyle}
                                        onPress={() => this.props.navigation.navigate('Product', { 'itemId': item.productTypeId })}>
                                        <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }} >
                                            <Image style={{ width: 200, height: 150, }} source={{ uri: (global.ServerUri + item.productTypeImage) }} />
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
        width: 200,
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
        padding: 7,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,

    }
});

export default HomeScreen;
