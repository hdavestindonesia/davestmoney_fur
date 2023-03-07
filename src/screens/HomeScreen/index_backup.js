import React from 'react';
import { View, Text, Alert, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { homeFetchData } from "../../boot/actions";



const slidesatu = require('../../../assets/slidesatuC.png');
const slidedua = require('../../../assets/slideduaC.png');
const slidetiga = require('../../../assets/slidetigaC.png');
const doekuicon = require('../../../assets/doekuiconC.png');
const pinjamanmodalusaha = require('../../../assets/pinjamanmodalusahaC.png');
const pendanaan = require('../../../assets/pendanaanC.png');
const menu = require('../../../assets/menutigaC.png');
const documenticon = require('../../../assets/documenticonC.png');
const homedua = require('../../../assets/homeduaC.png');
const rupiah = require('../../../assets/rupiahC.png');
const returnrate = require('../../../assets/returnrateC.png');
const protectedrpicon = require('../../../assets/protectedrpiconC.png');
const kemudahandalammemulai = require('../../../assets/kemudahandalammemulaiC.png');
const cekttdgagal = require('../../../assets/cekttdgagalduaC.png');
const cekttdoke = require('../../../assets/cekttdokeduaC.png');
const danger = require('../../../assets/dangerC.png');
const checklist = require('../../../assets/checklistC.png');
const logoojk = require('../../../assets/logoojkC.png');
const back = require('../../../assets/backC.png');
const unnotif = require('../../../assets/unnotifC.png');
const iconselfie = require('../../../assets/iconselfieC.png');
const loading = require('../../../assets/loadingC.gif');
const pendanaan_perorangan = require('../../../assets/pendanaan_peroranganC.png');
const pendanaan_perusahaan = require('../../../assets/pendanaan_perusahaanC.png');
const emailmasuk = require('../../../assets/emailmasukC.png');
const emailsukses = require('../../../assets/emailsuksesC.png');





const lengkapi_biodata = require('../../../assets/jsongif/lengkapi_biodata.json');
const loading = require('../../../assets/jsongif/loading.json');
const loading_google = require('../../../assets/jsongif/loading_google.json');
const loading1 = require('../../../assets/jsongif/loading1.json');
const loadings = require('../../../assets/jsongif/loadings.json');
const loadingss = require('../../../assets/jsongif/loadingss.json');
const saldo = require('../../../assets/jsongif/saldo.json');
const scan_document = require('../../../assets/jsongif/scan_document.json');
const scan_dokument_pdf = require('../../../assets/jsongif/scan_dokument_pdf.json');
const scan_id = require('../../../assets/jsongif/scan_id.json');
const scan_ktp = require('../../../assets/jsongif/scan_ktp.json');
const scoring = require('../../../assets/jsongif/scoring.json');
const tiket_lottie_loading = require('../../../assets/jsongif/tiket_lottie_loading.json');
const verifikasi = require('../../../assets/jsongif/verifikasi.json');


import Lottie from 'lottie-react-native';






// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import ImageSlider from 'react-native-image-slider';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from 'react-native-reanimated-carousel';

import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
const pinjamanmodalusahanav = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Pinjamanmodalusaha" })]
});

const pendananav = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Pendana" })]
});


class HomeScreenForm extends React.Component {
// class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status_page: "satu",
      images: [
        slidesatu,          // Local image
        slidedua,
        slidetiga
      ]
    }
    this.start()
  }

  async start()
  {
    // var body_home = "TESSSSSSSSSS DARI REDUCER";
    // await this.props.fetchDataHome(body_home);

    // Alert.alert("tes")
    // AsyncStorage.setItem('reg_email', "")
    // AsyncStorage.setItem('reg_phonenumber', "")
    // AsyncStorage.setItem('reg_password', "")

    var reg_email = await AsyncStorage.getItem('reg_email')
    var reg_phonenumber = await AsyncStorage.getItem('reg_phonenumber')
    var reg_password = await AsyncStorage.getItem('reg_password')
    if (reg_email != null && reg_phonenumber != null && reg_password != null)
    {
      if (reg_email != "" && reg_phonenumber != "" && reg_password != "")
      {
        this.props.navigation.dispatch(pendananav)
      }
    }

    setTimeout(() => { 
      this.setState({
        status_page: "dua"
      })
    }, 2800)
  }

  form_satu()
  {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>
          
          <View style={{height: "8%", width: "69%", alignSelf: "center", marginTop: "48%", justifyContent: "center"}}>
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={doekuicon}
            />
          </View>



        <View 
          style={{position: 'absolute',
            flex:0.1,
            left: 0,
            right: 0,
            bottom: -10,
            alignSelf: "center", 
            justifyContent: "center", 
            width: "100%", 
            backgroundColor: 'white'
          }}
        >
          <View style={{flexDirection: "row", width: "90%", height: 68, marginBottom: "3%", alignSelf: "center"}}>
            <View style={{width: "59%", height: "100%", alignSelf: "flex-end"}}>
              <Text style={{fontSize: 13, alignSelf: "flex-end", marginTop: 23}}>
                Berizin dan diawasi oleh
              </Text>
            </View>            

            <View style={{width: "36%", height: "100%"}}>
                    <Image
                      style={{
                        marginTop: 9,
                        height: "58%",
                        width: "80%",
                        resizeMode: "stretch",
                        alignSelf: "center"
                      }}
                      circle
                      source={logoojk}
                    />
            </View>
          </View>
        </View>

      </View>
    )
  }

  form_dua()
  {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>
        <ImageSlider 
          images={[
            slidesatu,
            slidedua,
            slidetiga
          ]}
        />
      </View>
    )
  }

  form_tiga()
  {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>
        
        <View style={{width: "100%", height: 28, flexDirection: "row"}}>
          <TouchableHighlight 
            style={{height: "100%", width: "10%"}}
            onPress={() => { Alert.alert("TES") }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={menu}
            />
          </TouchableHighlight>
          <View style={{height: "100%", width: "1%"}}>
          </View>
          <View style={{height: "100%", width: "30%"}}>
            <Image
              style={{
                height: "60%",
                width: "80%",
                marginTop: 3,
                resizeMode: "stretch"
              }}
              circle
              source={doekuicon}
            />
          </View>
        </View>

        <SliderBox 
          images={this.state.images} 
          sliderBoxHeight={185}
        />

        <View style={{flexDirection: "row", width: "90%", height: 148, alignSelf: "center", justifyContent: "center", marginTop: 13}}>
          <TouchableHighlight style={{
            width: "48%", 
            height: "100%", 
            borderRightWidth: 3, 
            borderLeftWidth: 3,
            borderBottomWidth: 3,
            borderTopWidth: 1,  

            borderRightColor: "#F8F8FF", 
            borderLeftColor: "#F8F8FF", 
            borderBottomColor: "#F8F8FF", 
            borderTopColor: "#F8F8FF", 
            borderRadius: 18,
            overflow: 'hidden'
          }}
          onPress={() => { this.props.navigation.dispatch(pinjamanmodalusahanav) } }
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={pinjamanmodalusaha}
            />
          </TouchableHighlight>

          <View style={{width: "3%", height: "100%"}}>
          </View>

          <TouchableHighlight style={{
            width: "48%", 
            height: "100%", 
            borderRightWidth: 3, 
            borderLeftWidth: 3,
            borderBottomWidth: 3,
            borderTopWidth: 1,  

            borderRightColor: "#F8F8FF", 
            borderLeftColor: "#F8F8FF", 
            borderBottomColor: "#F8F8FF", 
            borderTopColor: "#F8F8FF", 
            borderRadius: 18,
            overflow: 'hidden'
          }}
          onPress={() => { this.props.navigation.dispatch(pendananav) } }
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={pendanaan}
            />
          </TouchableHighlight>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 20}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "bold", paddingLeft: 6 }}>
            Pinjaman
          </Text>
        </View>


        <View style={{borderRadius: 3, width: "90%", height: 38, backgroundColor: "#F5FFFA", alignSelf: "center", justifyContent: "flex-start", marginTop: 13, flexDirection: "row"}}>
            <Image
              style={{
                height: 23,
                width: 23,
                resizeMode: "stretch",
                marginLeft: 8,
                marginTop: 8
              }}
              circle
              source={documenticon}
            />
          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 6, marginTop: 8 }}>
            Proses Mudah dan Cepat
          </Text>
        </View>


        <View style={{borderRadius: 3, width: "90%", height: 38, backgroundColor: "#F5FFFA", alignSelf: "center", justifyContent: "flex-start", marginTop: 9, flexDirection: "row"}}>
            <Image
              style={{
                height: 23,
                width: 23,
                resizeMode: "stretch",
                marginLeft: 8,
                marginTop: 8
              }}
              circle
              source={homedua}
            />
          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 6, marginTop: 8 }}>
            Suku Bunga Lebih Kompetitif
          </Text>
        </View>


        <View style={{borderRadius: 3, width: "90%", height: 38, backgroundColor: "#F5FFFA", alignSelf: "center", justifyContent: "flex-start", marginTop: 9, flexDirection: "row"}}>
            <Image
              style={{
                height: 23,
                width: 23,
                resizeMode: "stretch",
                marginLeft: 8,
                marginTop: 8
              }}
              circle
              source={rupiah}
            />
          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 6, marginTop: 8 }}>
            Biaya Terjangkau
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 20}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "bold", paddingLeft: 6 }}>
            Pendana
          </Text>
        </View>


        <View style={{borderRadius: 3, width: "90%", height: 38, backgroundColor: "#F5FFFA", alignSelf: "center", justifyContent: "flex-start", marginTop: 13, flexDirection: "row"}}>
            <Image
              style={{
                height: 23,
                width: 23,
                resizeMode: "stretch",
                marginLeft: 8,
                marginTop: 8
              }}
              circle
              source={returnrate}
            />
          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 6, marginTop: 8 }}>
            Return Rate Menarik
          </Text>
        </View>


        <View style={{borderRadius: 3, width: "90%", height: 38, backgroundColor: "#F5FFFA", alignSelf: "center", justifyContent: "flex-start", marginTop: 9, flexDirection: "row"}}>
            <Image
              style={{
                height: 23,
                width: 23,
                resizeMode: "stretch",
                marginLeft: 8,
                marginTop: 8
              }}
              circle
              source={protectedrpicon}
            />
          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 6, marginTop: 8 }}>
            Perlindungan Pinjaman
          </Text>
        </View>

        <View style={{borderRadius: 3, width: "90%", height: 38, backgroundColor: "#F5FFFA", alignSelf: "center", justifyContent: "flex-start", marginTop: 9, flexDirection: "row"}}>
            <Image
              style={{
                height: 23,
                width: 23,
                resizeMode: "stretch",
                marginLeft: 8,
                marginTop: 8
              }}
              circle
              source={kemudahandalammemulai}
            />
          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 6, marginTop: 8 }}>
            Kemudahan Dalam Memulai
          </Text>
        </View>




      </View>
    )
  }

  render() {
    if(this.state.status_page == "satu")
    {
      return (this.form_satu())
    }
    else if(this.state.status_page == "dua")
    {
      return (this.form_dua())
    }
    else if(this.state.status_page == "tiga")
    {
      return (this.form_tiga())
    }
  }
}

const HomeScreen = reduxForm({
  form: "HomeScreen"
})(HomeScreenForm);

function bindAction(dispatch) {
  return {
    fetchDataHome: body_home => dispatch(homeFetchData(body_home))
  };
}
const mapStateToProps = state => ({
  data_home: state.homeReducer.data_home
});


export default connect(mapStateToProps, bindAction)(HomeScreen);
// export default (HomeScreen);