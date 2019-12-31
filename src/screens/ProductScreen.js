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

class ProductScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productType: '',
            category: '',
            subCategory: '',
            minPriceFilter: 0.0,
            maxPriceFilter: 1000.0,
            products: [],
            brands: [],
        }


    }

    componentDidMount() {
        //const { navigation } = this.props; با این خط دیگر نمیخواهد در body ما this.propsبنویسیم
        fetch(global.ServerUri + 'api/v1/products/' + this.props.navigation.getParam('itemId'))
            //,{ body: 'id=' + this.props.navigation.getParam('itemId')})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    products: responseJson.products,
                    productType: responseJson.productType,
                    category: responseJson.category,
                    subCategory: responseJson.subCategory,
                    minPriceFilter: responseJson.minPriceFilter,
                    maxPriceFilter: responseJson.maxPriceFilter,
                    brands: responseJson.brands
                });


            })

            .catch((error) => {
                console.error(error);
            });

        //console.log(this.props.navigation.getParam('itemId')+'\n');



    }
    render() {
        let i = 0;
        return (
            <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
                <View style={{ backgroundColor: 'red', height: 60 }}>
                    <Text>بخش فیلتر</Text>
                </View>
                <FlatList style={{ flex: 1, }}
                    numColumns={2}
                    data={this.state.products}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ flex: 1, marginTop: 10, marginBottom: 30 }} >

                                <TouchableOpacity style={styles.TouchableOpacityStyle}
                                    // onPress={() => this.props.navigation.push('Details', { itemId: item.id })}
                                    onPress={() => this.props.navigation.navigate('Detail', { 'itemId': item.id })}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10, }} >
                                        <Image style={{ width: 184, marginLeft: 13, height: 185, }} source={{ uri: (global.ServerUri + item.picture) }} />

                                        <Text style={styles.textpic}> {item.name}</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            borderTopColor: '#E5E2E2',
                                            padding: 5,
                                            width: 200,
                                            height: 33,
                                            color: 'red',
                                            textAlign: "center",
                                            fontFamily: 'Kamran'
                                        }}> {item.prices.originalPrice} تومان</Text>

                                        <Text style={{
                                            fontSize: 14,

                                            borderTopColor: '#E5E2E2',
                                            padding: 5,
                                            width: 200,
                                            height: 33,
                                            color: 'green',
                                            textAlign: "center",
                                            fontFamily: 'Kamran'
                                        }}>با تخفیف:{item.prices.payPrice} تومان</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>

                        )
                    }
                    }
                    keyExtractor={(item, index) => "key" + index} />
            </View>
        );
    }
}
const styles = StyleSheet.create({

    textpic: {
        fontSize: 17,
        borderTopWidth: 1,
        borderTopColor: '#E5E2E2',
        padding: 5,
        width: 186,
        height: 30,
        textAlign: "center",
        marginLeft: 12,
        //marginBottom: 3,
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


export default ProductScreen;