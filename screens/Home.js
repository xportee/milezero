import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  TouchableOpacity,
  Image
  } from 'react-native';
import { Button, Block, Text, Input, theme, DeckSwiper } from 'galio-framework';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';

import { Icon, Product } from '../components/';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Card, ListItem} from 'react-native-elements';

const { width, height } = Dimensions.get('screen');
import products from '../constants/products';
import { ScrollView } from 'react-native-gesture-handler';

const thumbMeasure = (width - 48 - 32) / 3;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
      carouselItems : [],
      search: '',
    };
  }

  renderButton = () => {
    const buttonClickedHandler = () => {
      console.log('You have been clicked a button!');
      // do something
    };
  
    return (
      <TouchableOpacity
        onPress={buttonClickedHandler}
        style={styles.roundButton1}>
        <Icon name="search" family="font-awesome" color={theme.COLORS.WHITE} size={16} />
      </TouchableOpacity>
    );
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  renderSearch = () => {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        round
        lightTheme
        platform="android"
      />
    )
  };

  renderPortfolio = () => {

    return (
      <Block style={styles.main}>
        <Text size={18} style={{marginBottom:10, marginLeft:theme.SIZES.BASE, fontWeight:"bold"}}>Your Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Block flex row>
            <Product portfolio product={products[5]} style={{ marginLeft: theme.SIZES.BASE, marginRight: theme.SIZES.BASE, borderWidth:1, borderColor:"#439CEF"}} />
            <Product portfolio product={products[6]} style={{ borderWidth:1, marginRight: theme.SIZES.BASE, borderColor:"#439CEF" }}/>
          </Block>
        </ScrollView>
      </Block>
    )
  }

  renderHeader = () => {
    return(
      <Block flex>
      <ImageBackground
        source={{uri: Images.Profile}}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}>
        <Block flex style={styles.profileDetails}>
          <Block style={styles.profileTexts}>
            <Text color="white" size={28} style={{ paddingBottom: 8 }}>New Listing</Text>
            <Block row space="between">
              <Block row>
                <Text color="white" size={16} muted style={styles.seller}>PT. Kopi Makassar</Text>
              </Block>
            </Block>
          </Block>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
        </Block>
      </ImageBackground>
    </Block>
    );
  };

  renderProduct = () => {
    return (
      <Block style={styles.main}>
        <Text size={18} style={{marginBottom:10, marginLeft:theme.SIZES.BASE, fontWeight:"bold"}}>UMKM's Listing</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Block flex row>
            <Product product={products[1]} style={{ marginLeft: theme.SIZES.BASE, marginRight: theme.SIZES.BASE, borderWidth:1, borderColor:"#439CEF"}} />
            <Product product={products[2]} style={{ marginRight: theme.SIZES.BASE, borderWidth:1, borderColor:"#439CEF" }} />
            <Product product={products[3]} style={{ marginRight: theme.SIZES.BASE, borderWidth:1, borderColor:"#439CEF" }} />
            <Product product={products[4]} style={{ marginRight: theme.SIZES.BASE, borderWidth:1, borderColor:"#439CEF" }} />
            <Product product={products[2]} style={{ borderWidth:1, marginRight: theme.SIZES.BASE, borderColor:"#439CEF" }}/>
          </Block>
        </ScrollView>
      </Block>
    )
  }

  renderCards = () => {
    return (
      <Block>
        <Text size={14} style={styles.title}>TODAY'S DAILY DEALS</Text>
        <Block flex style={styles.main}>
            <Block flex row>
              <Product minim product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Product minim product={products[2]} />
            </Block>
            <Block flex row>
              <Product minim product={products[3]} style={{ marginRight: theme.SIZES.BASE }} />
              <Product minim product={products[4]} />
            </Block>
            <Block flex row>
              <Product minim product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Product minim product={products[2]} />
            </Block>
        </Block>
      </Block>
    )
  }

  _renderItem = ({item,index}) => {
    return (
      <Block style={{
        backgroundColor:'white',
        borderRadius: 25,
        height: (Dimensions.get('window').width*0.8)*9/16,
        elevation: 5,
        marginBottom: 3.5,
        overflow: 'hidden'
        }}>
        {
          <ImageBackground source={{uri: item.image}} style={{ marginRight: theme.SIZES.BASE }}/>
        }
      </Block>
    )
  }

  renderCarousel = () => {
    return(
      <Block style={styles.carousel}>
      <Text size={14} style={styles.title}>YOUR RECOMMENDATION</Text>
      <Carousel
        ref={ref => this.carousel = ref}
        layout={"stack"}
        data={products}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width*0.8}
        renderItem={this._renderItem}
        activeSlideOffset={35}
        onSnapToItem={ (index) => this.setState({activeSlideIndex: index})}/>
      <Pagination
        dotsLength={products.length}
        activeDotIndex={this.state.activeSlideIndex}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: 3,
          backgroundColor: 'rgba(200, 200, 200, 1)'
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(200, 200, 200, 1)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}/>
    </Block>
    );
  }

  render() {
    return (
      <ScrollView>
        <Block flex style={{backgroundColor: 'white'}}>
          {this.renderHeader()}
          {this.renderSearch()}
          {this.renderPortfolio()}
          {this.renderProduct()}
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 40,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 1,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  carousel: {
    marginTop : theme.SIZES.BASE * 1,
    marginBottom : theme.SIZES.BASE * 0.5,
  },
  main : {
    marginBottom : theme.SIZES.BASE * 1,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
  },
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,

  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: width/1.5,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  roundButton1: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#2f7ae5',
  },
});