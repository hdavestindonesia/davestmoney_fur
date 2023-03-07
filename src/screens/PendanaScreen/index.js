import React from 'react';
import { View, Text, Alert, Image, TouchableHighlight, Modal, TextInput, Spinner, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import CheckBox from '@react-native-community/checkbox';


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
const iconhp = require('../../../assets/iconhpC.png');



const lengkapi_biodata = require('../../../assets/jsongif/lengkapi_biodata.json');
const loading_lot = require('../../../assets/jsongif/loading.json');
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


import { SliderBox } from "react-native-image-slider-box";
import { pinjamanmodalusahaFetchData } from "../../boot/actions";

import { RNCamera, FaceDetector } from 'react-native-camera';
import ImgToBase64 from 'react-native-image-base64';
import RNImageManipulator from "@oguzhnatly/react-native-image-manipulator";

import { Blurriness } from '@bstrickl/blurriness';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import FaceDetection, { FaceDetectorContourMode, FaceDetectorLandmarkMode, FaceContourType } from "react-native-face-detection";

import LinearGradient from 'react-native-linear-gradient';

import { loginpendanaFetchData, preregisterFetchData, verifikasiemailFetchData } from "../../boot/actions";

import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
const homenav = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Home" })]
});

const pendananav = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Pendana" })]
});



import { WebView, WebViewNavigation } from 'react-native-webview';



import OTPInputView from 'saymee-react-native-otp-input';
// import OTPTextInput from 'react-native-otp-textinput';
// import OtpInputs from 'react-native-otp-inputs';



import { openInbox } from "react-native-email-link";

import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

const options = {
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 120,
    alignSelf: "flex-start",
    marginBottom: 4
  },
  text: {
    fontSize: 13,
    color: 'black'
  }
};

class PendanaScreenForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status_page: "awal_login",
      tlpemail: "",
      password: "",
      isLoading: false,
      pendanaan_perusahaan: false,
      pendanaan_perorangan: false,
      pendanaan_tnc: false,
      email: "",
      nohp: "",
      password: "",
      kodereferal: "",
      hasInjectedVariable: false,

      timerStart: true,
      totalDuration: 20000,
      timerReset: false,
      ////////////////////////////
      resend_email: false
    }
    ////////////////////////////////////////////////////////
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    ////////////////////////////////////////////////////////
    this.start()
  }

  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }
 
  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }
 
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }
 
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime(time) {
      this.currentTime = time;
  };













  






  










  async start()
  {
    var email = await AsyncStorage.getItem('email')
    var phonenumber = await AsyncStorage.getItem('phonenumber')
    if (email != null && phonenumber != null)
    {
      if (email != "" && phonenumber != "")
      {
        this.setState({status_page: "awal_beranda"})
      }
    }



    var reg_email = await AsyncStorage.getItem('reg_email')
    var reg_phonenumber = await AsyncStorage.getItem('reg_phonenumber')
    var reg_password = await AsyncStorage.getItem('reg_password')
    if (reg_email != null && reg_phonenumber != null && reg_password != null)
    {
      if (reg_email != "" && reg_phonenumber != "" && reg_password != "")
      {
        this.setState({status_page: "registrasi email sukses"})
        // openInbox()
      }
    }
  }

  async proses_loginpendana()
  {
    this.setState({isLoading: true})
    var body_loginpendana = {
      "command":"LOGIN_LENDER",
      "phonenumber":"082220355938",
      "password":"4d0b24ccade22df6d154778cd66baf04288aae26df97a961f3ea3dd616fbe06dcebecc9bbe4ce93c8e12dca21e5935c08b0954534892c568b8c12b92f26a2448"
    }
    await this.props.fetchDataLoginpendana(body_loginpendana);

    setTimeout(() => { this.confirm_proses_loginpendana() }, 4800)
  }

  async proses_verifikasi_email()
  {
    // this.setState({isLoading: true})
    // var body_verifikasiemail = {
    //   "command":"REGISTER_BORROWER",
    //   "email":"furqongrit2@gmail.com",
    //   "phonenumber":"6285891238887",
    //   "referralcode":"",
    //   "lendertype":"2",
    //   "password":"12345678"
    // }
    // await this.props.fetchDataverifikasiemail(body_verifikasiemail);
    // setTimeout(() => { this.konfirmasi_proses_verifikasi_email() }, 4800)
    this.konfirmasi_proses_verifikasi_email()
  }

  async konfirmasi_proses_verifikasi_email()
  {
    AsyncStorage.setItem('reg_email', "furqongrit2@gmail.com")
    AsyncStorage.setItem('reg_phonenumber', "6285891238887")
    AsyncStorage.setItem('reg_password', "12345678")
    this.setState({status_page: "registrasi email sukses"})

    // Alert.alert("data_verifikasiemail",JSON.stringify(this.props.data_verifikasiemail))
    // this.setState({isLoading: false})

    openInbox()
  }

  async confirm_proses_loginpendana()
  {
    if(JSON.stringify(this.props.data_loginpendana) != "[]")
    {
      

      if(this.props.data_loginpendana.resultcode == "0000")
      {
        AsyncStorage.setItem('email', this.props.data_loginpendana.email)
        AsyncStorage.setItem('phonenumber', this.props.data_loginpendana.phonenumber)

        setTimeout(() => {
          this.setState({isLoading: false})
          this.props.navigation.dispatch(pendananav)
        }, 3900)
      }
      else if(this.props.data_loginpendana.resultcode == "0022")
      {
        Alert.alert("","⚠️ "+this.props.data_loginpendana.message)
        this.setState({isLoading: false})
      }
      else if(this.props.data_loginpendana.resultcode == "0011")
      {
        Alert.alert("","⚠️ "+this.props.data_loginpendana.message)
        this.setState({isLoading: false})
      }
    }
    else if(JSON.stringify(this.props.data_loginpendana) == "[]")
    {
      this.proses_loginpendana()
    }
  }


  form_footer()
  {
    if(this.state.status_page != "hp sukses" && this.state.status_page != "verifikasi hp" && this.state.status_page != "cek hp" && this.state.status_page != "email sukses" && this.state.status_page != "awal_login" && this.state.status_page != "registrasi email sukses")
    {
      return(
        <View>

          <View style={{flexDirection: "row", width: "90%", height: 80, marginTop: "9%", alignSelf: "center"}}>
            <View style={{width: "59%", height: "100%", alignSelf: "flex-end"}}>
              <Text style={{fontSize: 16, alignSelf: "flex-end", marginTop: 23}}>
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
      )
    }
    else if(this.state.status_page != "hp sukses" && this.state.status_page != "verifikasi hp" && this.state.status_page != "cek hp" && this.state.status_page != "email sukses" && this.state.status_page == "awal_login" && this.state.status_page != "registrasi email sukses")
    {
      return(
        <View>

          <View style={{flexDirection: "row", width: "90%", height: 80, alignSelf: "center", marginTop: -8}}>
            <View style={{width: "59%", height: "100%", alignSelf: "flex-end"}}>
              <Text style={{fontSize: 16, alignSelf: "flex-end", marginTop: 23}}>
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

          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 9,width: "100%", height: 60, backgroundColor: "#FFA500"}}
            onPress={() => { this.proses_loginpendana() }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>LOGIN</Text>
          </TouchableHighlight>

        </View>
      )
    }
    
  }  

  form_awal_login()
  {
    return(
      <View>
        <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row", justifyContent: "center"}}>
          <View style={{width: "25%", height: "100%"}}>
            <TouchableHighlight
              style={{alignSelf: "center", marginTop: 9}}
              onPress={()=>{this.props.navigation.dispatch(homenav)} }
            >
              <Image
                style={{
                  height: 29,
                  width: 29,
                  resizeMode: "stretch"
                }}
                circle
                source={back}
              />
            </TouchableHighlight>
          </View>

          <View style={{width: "50%", height: "100%"}}>
            <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "center", marginTop: 13}}>Login Pemberi Dana</Text>
          </View>
         
          <View style={{width: "25%", height: "100%"}}>
            
          </View>         
        </View>




        <View style={{width: "90%", height: "59%", marginTop: 68, borderRadius: 8, borderWidth: 2, borderColor: "#F8F8FF", alignSelf: "center", justifyContent: "center"}}>
          <View style={{height: "13%", width: "69%", alignSelf: "center", marginTop: 8, justifyContent: "center"}}>
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
          <Text style={{fontSize: 8, alignSelf: "center", marginTop: 3, fontWeight: "bold"}}>Pinjaman Modal Usaha Pedagang Pulsa</Text>

          <TextInput 
            style={{width: "83%", height: 49, marginTop: 19, alignSelf: "center"}}
            onChangeText={(text)=> {this.setState({tlpemail: text})} }
            placeholder="Email / No HP Terdaftar"
          />
          <View style={{width: "83%", alignSelf: "center", borderBottomWidth: 1}} />

          <TextInput 
            style={{width: "83%", height: 49, marginTop: 3, alignSelf: "center"}}
            onChangeText={(text)=> {this.setState({password: text})} }
            placeholder="Password"
          />
          <View style={{width: "83%", alignSelf: "center", borderBottomWidth: 1}} />




          <View style={{flexDirection: "row", width: "83%", height: 28, marginTop: 13}}>
            <View style={{width: "50%", height: "100%"}}>
              <TouchableHighlight
                onPress={() => { this.setState({status_page: "awal_beranda"}) }}
              >
                <Text style={{fontSize: 11, alignSelf: "flex-start", marginTop: 3, fontWeight: "bold", paddingLeft: 33}}>
                  Registrasi
                </Text>
              </TouchableHighlight>
            </View>
            <View style={{width: "50%", height: "100%"}}>

            </View>
          </View>

        </View>



      </View>
    )
  }

  async back_from_beranda()
  {
    // AsyncStorage.setItem('email', "")
    // AsyncStorage.setItem('phonenumber', "")
    // this.props.navigation.dispatch(homenav)

    this.setState({status_page: "awal_login"})
  }

  form_pendanaan_perorangan()
  {
    return(
      <View style={{backgroundColor: 'white', height: "100%", width: "100%"}}>
        

          <View style={{width: "116%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row", justifyContent: "center"}}>
            <View style={{width: "25%", height: "100%"}}>
              <TouchableHighlight
                style={{alignSelf: "center", marginTop: 9}}
                onPress={()=>{
                  this.setState({pendanaan_perorangan: false})
                } }
              >
                <Image
                  style={{
                    height: 29,
                    width: 29,
                    resizeMode: "stretch"
                  }}
                  circle
                  source={back}
                />
              </TouchableHighlight>
            </View>

            <View style={{width: "50%", height: "100%"}}>
              <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "center", marginTop: 13}}>Konfirmasi Data Lender</Text>
            </View>
           
            <View style={{width: "25%", height: "100%"}}>
              
            </View>         
          </View>


        <SafeAreaView style={{width: "90%", height: 488, backgroundColor: "white", marginTop: 13, alignSelf: "center"}}>
          <ScrollView contentInsetAdjustmentBehavior="never" overScrollMode="auto" scrollEnabled={true} style={{width: "100%", height: "100%"}}>
            <Text style={{fontSize: 13, marginTop: 4}}>
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
              Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui Saya menyetujui 
            </Text>
          </ScrollView>
        </SafeAreaView>
        
        
          
        <LinearGradient 
          colors={['#F5F5F5', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white']}
          style={{
            position: 'absolute',
            flex:0.1,
            left: 0,
            right: 0,
            bottom: -10,
            alignSelf: "center", 
            justifyContent: "center", 
            width: "100%", 
            height: 188, 
            backgroundColor: 'white',

            borderTopWidth: 2,  
            borderTopColor: "#F8F8FF", 
          }}
        >
          <View style={{paddingLeft: 18, width: "90%", alignSelf: "flex-start", justifyContent: "flex-start", marginTop: 19, flexDirection: "row"}}>
            <View style={{flexDirection: "row"}}>
              <CheckBox
                value={this.state.pendanaan_tnc}
                onValueChange={()=> { this.setState({pendanaan_tnc: !this.state.pendanaan_tnc}) } }
                style={{alignSelf: "center"}}
              />
              <Text style={{fontSize: 13, marginTop: 5, paddingLeft: 8}}>Saya mengerti dan menyetujui</Text>
            </View>
          </View>

          
          {this.form_button_tnc()}
              

        </LinearGradient>

      </View>
    )
  }

  form_button_tnc()
  {
    if(this.state.pendanaan_tnc == true)
    {
      return(
        <View>
              <TouchableHighlight
                style={{borderRadius: 8, alignSelf: "center", marginTop: 13, marginBottom: 13,width: "90%", height: 60, backgroundColor: "#FFA500"}}
                onPress={() => { this.setState({status_page: "registrasi perorangan"}) }}
              >
                <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Selanjutnya</Text>
              </TouchableHighlight>
        </View>
      )
    }
    else if(this.state.pendanaan_tnc == false)
    {
      return(
        <View>
              <TouchableHighlight
                disabled={false}
                style={{borderRadius: 8, alignSelf: "center", marginTop: 13, marginBottom: 13,width: "90%", height: 60, backgroundColor: "#F5F5F5"}}
                onPress={() => { this.setState({status_page: "registrasi perorangan"}) }}
              >
                <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Selanjutnya</Text>
              </TouchableHighlight>
        </View>
      )
    }
  }

  form_pendanaan_perusahaan()
  {
    return(
      <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', height: "100%", width: "100%"}}>
        <View 
          style={{position: 'absolute',
            flex:0.1,
            left: 0,
            right: 0,
            bottom: -10,
            alignSelf: "center", 
            justifyContent: "center", 
            width: "100%", 
            height: 388, 
            backgroundColor: 'white'
          }}
        >
          <View style={{width: "100%", flexDirection: "row", position: 'absolute', top:10}}>
            <View style={{width: "10%", height: "100%"}}>
            </View>

            <View style={{width: "80%", height: "100%"}}>
            </View>           

            <View style={{width: "10%", height: "100%"}}>
              <TouchableHighlight
                onPress={()=> {this.setState({pendanaan_perusahaan: false})} }
              >
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  ✖️
                </Text>
              </TouchableHighlight>
            </View> 
          </View>

          <View style={{width: "90%", alignSelf: "center", position: 'absolute', top: 48}}>
            <Text style={{fontSize: 13, fontWeight: "bold", color: "black"}}>
              Konfirmasi Pendanaan Perusahaan
            </Text>

            <Text style={{fontSize: 13, color: "black", marginTop: 13}}>
              Apakah perusahaan Anda memiliki NPWP atas nama perusahaan dan ingin melakukan pemberian pinjaman senilai atau lebih besar dari Rp 100 juta ?
            </Text>

            <Text style={{fontSize: 13, color: "black", marginTop: 13}}>
              Jika Tidak, silahkan kembali ke halaman sebelumnya dan kami sarankan untuk memilih tipe akun perorangan
            </Text>

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
              height: 100, 
              backgroundColor: 'white'
            }}
          >
            <TouchableHighlight
              style={{borderRadius: 8, alignSelf: "center", marginBottom: 13,width: "90%", height: 60, backgroundColor: "#FFA500"}}
              onPress={() => { 
                this.setState({status_page: "registrasi perusahaan"}) 
              }}
            >
              <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Selanjutnya</Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  }

  form_awal_beranda()
  {
    return(
      <View>
        <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row", justifyContent: "center"}}>
          <View style={{width: "25%", height: "100%"}}>
            <TouchableHighlight
              style={{alignSelf: "center", marginTop: 9}}
              onPress={()=>{
                this.back_from_beranda()
              } }
            >
              <Image
                style={{
                  height: 29,
                  width: 29,
                  resizeMode: "stretch"
                }}
                circle
                source={back}
              />
            </TouchableHighlight>
          </View>

          <View style={{width: "50%", height: "100%"}}>
            <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "center", marginTop: 13}}>Jenis Akun Pendana</Text>
          </View>
         
          <View style={{width: "25%", height: "100%"}}>
            
          </View>         
        </View>


                      <Modal
                        visible={this.state.pendanaan_perorangan}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={ () => { this.setState({pendanaan_perorangan: false}) } } 
                        initWidth={800} 
                        initHeight={400}
                      >
                        {this.form_pendanaan_perorangan()}
                      </Modal>


                      <Modal
                        visible={this.state.pendanaan_perusahaan}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={ () => { this.setState({pendanaan_perusahaan: false}) } } 
                        initWidth={800} 
                        initHeight={400}
                      >
                        {this.form_pendanaan_perusahaan()}
                      </Modal>









          <TouchableHighlight
            style={{marginTop: 18, alignSelf: "center"}}
            onPress={() => { this.setState({pendanaan_perorangan: true}) } }
          >
          <View 
            style={{
              width: "90%", 
              height: 100, 

              borderRightWidth: 1, 
              borderLeftWidth: 1,
              borderBottomWidth: 3,
              borderTopWidth: 0,  

              borderRightColor: "#F8F8FF", 
              borderLeftColor: "#F8F8FF", 
              borderBottomColor: "#F8F8FF", 
              borderTopColor: "#F8F8FF", 
              
              borderRadius: 8,
              flexDirection: "row"
            }}

          >
            <View style={{width: "31%", height: "100%"}}>
              <View style={{height: 68, width: 68, alignSelf: "center", marginTop: 13, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={pendanaan_perorangan}
                />
              </View>
            </View>

            <View style={{width: "69%", height: "100%"}}>
              <Text style={{paddingLeft: 13, fontSize: 13, fontWeight: "bold", color: "black", marginTop: 13}}>
                Perorangan
              </Text>

              <Text style={{paddingLeft: 13, fontSize: 13, color: "black"}}>
                Untuk kamu yang ingin mengembangkan dana pribadi
              </Text>
            </View>
          </View>
          </TouchableHighlight>







          <TouchableHighlight
            style={{marginTop: 13, alignSelf: "center"}}
            onPress={() => { this.setState({pendanaan_perusahaan: true}) } }
          >
          <View 
            style={{
              width: "90%", 
              height: 100, 

              borderRightWidth: 1, 
              borderLeftWidth: 1,
              borderBottomWidth: 3,
              borderTopWidth: 0,  

              borderRightColor: "#F8F8FF", 
              borderLeftColor: "#F8F8FF", 
              borderBottomColor: "#F8F8FF", 
              borderTopColor: "#F8F8FF", 
              
              borderRadius: 8,
              flexDirection: "row"
            }}
            
          >
            <View style={{width: "31%", height: "100%"}}>
              <View style={{height: 68, width: 68, alignSelf: "center", marginTop: 13, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={pendanaan_perusahaan}
                />
              </View>
            </View>

            <View style={{width: "69%", height: "100%"}}>
              <Text style={{paddingLeft: 13, fontSize: 13, fontWeight: "bold", color: "black", marginTop: 13}}>
                Perusahaan
              </Text>

              <Text style={{paddingLeft: 13, fontSize: 13, color: "black"}}>
                Untuk pengembangan dana institusi atau perusahaan
              </Text>
            </View>
          </View>
          </TouchableHighlight>







      </View>
    )
  }

  async proses_resend_email()
  {
    if(this.state.status_page != "hp sukses")
    {
      this.setState({
        timerStart: false,
        timerReset: true,
      })

      setTimeout(() => { 
        this.setState({
          timerStart: true,
          totalDuration: 20000,
          timerReset: false,
          resend_email: false
        })
        this.proses_registrasi()
      }, 800) 
    }

    else if(this.state.status_page == "hp sukses")
    {
      this.setState({
        timerStart: false,
        timerReset: true,
      })

      setTimeout(() => { 
        this.setState({
          timerStart: true,
          totalDuration: 20000,
          timerReset: false,
          resend_email: false
        })
        // this.proses_registrasi()
      }, 800) 
    }
  }

  form_detik_email()
  {
    if(this.state.status_page != "hp sukses")
    {
      if(this.state.resend_email == false)
      {
        return(
          <View>
            <View style={{width: "100%", height: 80, flexDirection: "row", marginTop: 3, marginLeft: "16%", marginRight: "10%"}}>
              <View style={{width: "48%", height: "100%"}}>
                <Text style={{fontSize: 13, alignSelf: "flex-end"}}>
                  Pembaharuan dalam 
                </Text>
              </View>
              <View style={{width: "4%", height: "100%"}}>
              </View>
              <View style={{width: "48%", height: "100%"}}>
                <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                  reset={this.state.timerReset}
                  options={options}
                  handleFinish={(datadata)=> {
                    this.setState({
                      resend_email: true
                    })
                  } }
                  getTime={(time)=> {this.getFormattedTime(time)} } 
                />
              </View>
            </View>
          </View>
        )
      }
    }



    else if(this.state.status_page == "hp sukses")
    {
      if(this.state.resend_email == false)
      {
        return(
          <View>
            <View style={{width: "100%", height: 80, flexDirection: "row", marginTop: 3, marginLeft: "10%", marginRight: "10%"}}>
              <View style={{width: "48%", height: "100%"}}>
                <Text style={{fontSize: 13, alignSelf: "flex-end"}}>
                  Sisa Waktu
                </Text>
              </View>
              <View style={{width: "4%", height: "100%"}}>
              </View>
              <View style={{width: "48%", height: "100%"}}>
                <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                  reset={this.state.timerReset}
                  options={options}
                  handleFinish={(datadata)=> {
                    this.setState({
                      resend_email: true
                    })
                  } }
                  getTime={(time)=> {this.getFormattedTime(time)} } 
                />
              </View>
            </View>
          </View>
        )
      }
    }
  }
  form_resend_email()
  {
    if(this.state.status_page != "hp sukses")
    {
      if(this.state.resend_email == false)
      {
        return(
          <View>
            <TouchableHighlight
              disabled={true}
              style={{borderRadius: 8, alignSelf: "center", marginTop: 13, width: "48%", height: 60, backgroundColor: "#D3D3D3"}}
              onPress={() => { Alert.alert("tes") }}
            >
              <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Kirim email lagi</Text>
            </TouchableHighlight>
          </View>
        )
      }
      else if(this.state.resend_email == true)
      {
        return(
          <View>
            <TouchableHighlight
              style={{borderRadius: 8, alignSelf: "center", marginTop: 13, width: "48%", height: 60, backgroundColor: "#FFA500"}}
              onPress={() => { 
                this.proses_resend_email()
              }}
            >
              <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Kirim email lagi</Text>
            </TouchableHighlight>
          </View>
        )
      }
    }






    else if(this.state.status_page == "hp sukses")
    {
      if(this.state.resend_email == true)
      {
        return(
          <View>
            <TouchableHighlight
              style={{alignSelf: "center", marginTop: 13}}
              onPress={() => { 
                this.proses_resend_email()
              }}
            >
              <Text style={{fontSize: 13, color: "#6495ED", alignSelf: "center", marginTop: 13}}>Saya tidak menerima kode</Text>
            </TouchableHighlight>
          </View>
        )
      }
    }
  }

  form_register_email_sukses()
  {
    return(
      <View>




              <View style={{height: 108, width: 108, alignSelf: "center", marginTop: 19, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={emailmasuk}
                />
              </View>

              <Text style={{fontSize: 18, color: "black", alignSelf: "center", fontWeight: "bold"}}>
                Verifikasi email
              </Text>

              <View style={{width: "80%", height: 188, alignSelf: "center", marginTop: 28}}>
                <Text style={{fontSize: 18, color: "black", alignSelf: "center"}}>
                  Silahkan cek inbox email anda untuk melakukan proses verifikasi email
                </Text>
              </View>

              <View style={{alignSelf: "center", marginBottom: 13}}>
                <OTPInputView 
                  style={{width: '30%', height: 20}}
                  pinCount={4} 
                  onCodeFilled = {(code) => {
                    // Alert.alert("code",JSON.stringify(code))
                    setTimeout(() => { 
                      this.setState({
                        status_page: "email sukses"
                      })
                    }, 1800)
                  }}
                />
              </View>


    {this.form_resend_email()}

    {this.form_detik_email()}


    
        


    






        


        
              


              <TouchableHighlight
                style={{marginTop: 33, alignSelf: "center"}}
                onPress={()=> {
                  this.proses_verifikasi_email()
                } }
              >
                <Text style={{fontSize: 13, color: "#4169E1", alignSelf: "center"}}>
                  Cek Email Anda
                </Text>
              </TouchableHighlight>

      </View>
    )
  }



  

  form_cekemail()
  {
    const getCookiesJS = "ReactNativeWebView.postMessage(document.cookie)";
    console.log("--------------------1--------------------------"+getCookiesJS)
    return(
      <View style={{width: "100%", height: "100%"}}>
        
      </View>
    )
  }


  form_registrasi()
  {
    return(
      <View>
        
        <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row", justifyContent: "center"}}>
          <View style={{width: "25%", height: "100%"}}>
            <TouchableHighlight
              style={{alignSelf: "center", marginTop: 9}}
              onPress={()=>{
                this.setState({status_page: "awal_beranda"})
              } }
            >
              <Image
                style={{
                  height: 29,
                  width: 29,
                  resizeMode: "stretch"
                }}
                circle
                source={back}
              />
            </TouchableHighlight>
          </View>

          <View style={{width: "50%", height: "100%"}}>
            <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "center", marginTop: 13}}>Registrasi</Text>
          </View>
         
          <View style={{width: "25%", height: "100%"}}>
            
          </View>         
        </View>






        <View style={{width: "90%", height: 488, alignSelf: "center", marginTop: 13}}>
          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 13, color: "black", alignSelf: "center", marginTop: 8}}>Email</Text>
            <Text style={{fontSize: 13, color: "#FF0000", alignSelf: "center", marginTop: 8, paddingLeft: 3}}>*</Text>
          </View>
          <TextInput 
            style={{width: "100%", height: 48, alignSelf: "center", borderWidth: 1, borderColor: "black", borderRadius: 8}}
            onChangeText={(text)=> {this.setState({email: text})} }
          />


          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 13, color: "black", alignSelf: "center", marginTop: 8}}>Nomor Handphone</Text>
            <Text style={{fontSize: 13, color: "#FF0000", alignSelf: "center", marginTop: 8, paddingLeft: 3}}>*</Text>
          </View>
          <TextInput 
            style={{width: "100%", height: 48, alignSelf: "center", borderWidth: 1, borderColor: "black", borderRadius: 8}}
            onChangeText={(text)=> {this.setState({nohp: text})} }
          />


          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 13, color: "black", alignSelf: "center", marginTop: 8}}>Password</Text>
            <Text style={{fontSize: 13, color: "#FF0000", alignSelf: "center", marginTop: 8, paddingLeft: 3}}>*</Text>
          </View>
          <TextInput 
            style={{width: "100%", height: 48, alignSelf: "center", borderWidth: 1, borderColor: "black", borderRadius: 8}}
            onChangeText={(text)=> {this.setState({password: text})} }
          />


          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 13, color: "black", alignSelf: "center", marginTop: 8}}>Kode Referal</Text>
          </View>
          <TextInput 
            style={{width: "100%", height: 48, alignSelf: "center", borderWidth: 1, borderColor: "black", borderRadius: 8}}
            onChangeText={(text)=> {this.setState({kodereferal: text})} }
          />


              <TouchableHighlight
                style={{borderRadius: 8, alignSelf: "center", marginTop: 23, width: "100%", height: 60, backgroundColor: "#FFA500"}}
                onPress={() => { this.proses_registrasi() }}
              >
                <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Selanjutnya</Text>
              </TouchableHighlight>
          

        </View>

      </View>
    )
  }

  async proses_registrasi()
  {

    this.setState({isLoading: true})

    // var body_preregister = {
    //   "command":"REGISTER_BORROWER",
    //   "email":this.state.email,
    //   "phonenumber":this.state.nohp,
    //   "referralcode":"",
    //   "lendertype":"2",
    //   "password":this.state.password
    // }
    
    var body_preregister = {
      "command":"REGISTER_BORROWER",
      "email":"furqongrit2@gmail.com",
      "phonenumber":"6285891238887",
      "referralcode":"",
      "lendertype":"2",
      "password":"12345678"
    }
    await this.props.fetchDatapreregister(body_preregister);
    setTimeout(() => { this.confirm_proses_registrasi() }, 4800)

  }

  async confirm_proses_registrasi()
  {
    // Alert.alert("",JSON.stringify(this.props.data_preregister))
    

    this.setState({
      isLoading: false,
      status_page: "registrasi email sukses"
    })
  }

  form_validasi()
  {
    if(this.state.status_page == "awal_login")
    {
      return (this.form_awal_login())
    }
    else if(this.state.status_page == "awal_beranda")
    {
      return (this.form_awal_beranda())
    }
    else if(this.state.status_page == "registrasi perorangan")
    {
      return (this.form_registrasi()) 
    }
    else if(this.state.status_page == "registrasi perusahaan")
    {
      return (this.form_registrasi())
    }
    else if(this.state.status_page == "registrasi email sukses")
    {
      return (this.form_register_email_sukses())
    }
    else if(this.state.status_page == "cek email")
    {
      return (this.form_cekemail())
    }
    else if(this.state.status_page == "email sukses")
    {
      return (this.form_emailsukses())
    }
    else if(this.state.status_page == "cek hp")
    {
      return (this.form_cekhp())
    }
    else if(this.state.status_page == "verifikasi hp")
    {
      return (this.form_verifikasihp())
    }
    else if(this.state.status_page == "hp sukses")
    {
      return (this.form_hpsukses())
    }

    else if(this.state.status_page == "isi data profil")
    {
      return (this.form_isidataprofil())
    }
    
    
  }

  form_isidataprofil()
  {
    return(
      <View>

        <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row"}}>
          <View style={{width: "25%", height: "100%"}}>
          </View>  
          <View style={{width: "50%", height: "100%"}}>
            <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "flex-start", marginTop: 13}}>Isi Data Profil</Text>            
          </View>
          <View style={{width: "25%", height: "100%"}}>
          </View>
        </View>


          <TouchableHighlight
            style={{width: "100%", height: 49, borderWidth: 1, borderColor: "#D3D3D3", backgroundColor: "#F8F8FF", marginTop: 28}}
          >
            <View style={{flexDirection: "row"}}>
              <View style={{marginLeft: 8, width: 18, height: 18, alignSelf: "flex-start", marginTop: 13}}>
            
              </View>
              <Text style={{fontSize: 13, color: "black", alignSelf: "flex-start", marginTop: 13, marginLeft: 13}}>Data Perusahaan</Text>
            </View>
          </TouchableHighlight>



          <TouchableHighlight
            style={{width: "100%", height: 49, borderWidth: 1, borderColor: "#D3D3D3", backgroundColor: "#F8F8FF", marginTop: 13}}
          >
            <View style={{flexDirection: "row"}}>
              <View style={{marginLeft: 8, width: 18, height: 18, alignSelf: "flex-start", marginTop: 13}}>
                    
              </View>
              <Text style={{fontSize: 13, color: "black", alignSelf: "flex-start", marginTop: 13, marginLeft: 13}}>Akun Bank</Text>
            </View>
          </TouchableHighlight>





          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 238,width: "100%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            onPress={() => { this.setState({status_page: "filter"}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Daftar</Text>
          </TouchableHighlight>


      </View>
    )
  }

  // form_isidataprofil()
  // {
  //   return(
  //     <View>

  //       <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row"}}>
  //         <View style={{width: "25%", height: "100%"}}>
  //         </View>  
  //         <View style={{width: "50%", height: "100%"}}>
  //           <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "flex-start", marginTop: 13}}>Isi Data Profil</Text>            
  //         </View>
  //         <View style={{width: "25%", height: "100%"}}>
  //         </View>
  //       </View>


  //         <TouchableHighlight
  //           style={{width: "100%", height: 49, borderWidth: 1, borderColor: "#D3D3D3", backgroundColor: "#F8F8FF", marginTop: 28}}
  //         >
  //           <View style={{flexDirection: "row"}}>
  //             <View style={{marginLeft: 8, width: 23, height: 23, alignSelf: "flex-start", marginTop: 13}}>
  //                   <Image
  //                     style={{
  //                       height: "100%",
  //                       width: "100%",
  //                       resizeMode: "stretch"
  //                     }}
  //                     circle
  //                     source={checklist}
  //                   />
  //             </View>
  //             <Text style={{fontSize: 13, color: "black", alignSelf: "flex-start", marginTop: 13, marginLeft: 13}}>Data Perusahaan</Text>
  //           </View>
  //         </TouchableHighlight>



  //         <TouchableHighlight
  //           style={{width: "100%", height: 49, borderWidth: 1, borderColor: "#D3D3D3", backgroundColor: "#F8F8FF", marginTop: 13}}
  //         >
  //           <View style={{flexDirection: "row"}}>
  //             <View style={{marginLeft: 8, width: 23, height: 23, alignSelf: "flex-start", marginTop: 13}}>
  //                   <Image
  //                     style={{
  //                       height: "100%",
  //                       width: "100%",
  //                       resizeMode: "stretch"
  //                     }}
  //                     circle
  //                     source={checklist}
  //                   />
  //             </View>
  //             <Text style={{fontSize: 13, color: "black", alignSelf: "flex-start", marginTop: 13, marginLeft: 13}}>Akun Bank</Text>
  //           </View>
  //         </TouchableHighlight>





  //         <TouchableHighlight
  //           style={{alignSelf: "center", marginTop: 238,width: "100%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
  //           onPress={() => { this.setState({status_page: "filter"}) }}
  //         >
  //           <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Daftar</Text>
  //         </TouchableHighlight>


  //     </View>
  //   )
  // }

  form_hpsukses()
  {
    return(
      <View style={{width: "100%", height: "100%"}}>

          <View style={{width: "100%", flexDirection: "row", position: 'absolute', top:10}}>
            <View style={{width: "10%", height: "100%"}}>
            </View>

            <View style={{width: "80%", height: "100%"}}>
            </View>           

            <View style={{width: "10%", height: "100%"}}>
              <TouchableHighlight
                onPress={()=> { 
                  // this.setState({status_page: "cek email"}) 
                } }
              >
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  ✖️
                </Text>
              </TouchableHighlight>
            </View> 
          </View>


              <View style={{height: 128, width: 168, alignSelf: "center", marginTop: 48, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={iconhp}
                />
              </View>

              <Text style={{fontSize: 18, color: "black", alignSelf: "center", fontWeight: "bold"}}>
                Verifikasi No. Handphone
              </Text>    

              <View style={{width: "80%", height: 188, alignSelf: "center", marginTop: 28}}>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  Masukkan Kode OTP yang kami kirimkan
                </Text>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  Ke nomor 6285891238887
                </Text>
              </View>      




              <View style={{alignSelf: "center", marginBottom: 13}}>
                <OTPInputView 
                  style={{width: '30%', height: 20}}
                  pinCount={4} 
                  onCodeFilled = {(code) => {
                    // Alert.alert("code",JSON.stringify(code))
                    setTimeout(() => { 
                      this.setState({
                        status_page: "isi data profil"
                      })
                    }, 1800)
                  }}
                />
              </View>

              {this.form_detik_email()}

              {this.form_resend_email()}




      </View>
    )
  }

  form_verifikasihp()
  {
    return(
      <View style={{width: "100%", height: "100%"}}>

          <View style={{width: "100%", flexDirection: "row", position: 'absolute', top:10}}>
            <View style={{width: "10%", height: "100%"}}>
            </View>

            <View style={{width: "80%", height: "100%"}}>
            </View>           

            <View style={{width: "10%", height: "100%"}}>
              <TouchableHighlight
                onPress={()=> { 
                  // this.setState({status_page: "cek email"}) 
                } }
              >
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  ✖️
                </Text>
              </TouchableHighlight>
            </View> 
          </View>


              <View style={{height: 128, width: 168, alignSelf: "center", marginTop: 48, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={iconhp}
                />
              </View>

              <Text style={{fontSize: 18, color: "black", alignSelf: "center", fontWeight: "bold"}}>
                Verifikasi No. Handphone
              </Text>    

              <View style={{width: "80%", height: 188, alignSelf: "center", marginTop: 28}}>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  Kode OTP akan kami kirimkan ke Nomor
                </Text>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  6285891238887
                </Text>
              </View>      




              <TouchableHighlight
                style={{borderRadius: 8, alignSelf: "center", marginTop: 23, marginBottom: 13,width: "90%", height: 60, backgroundColor: "#FFA500"}}
                onPress={() => { 
                  this.setState({
                    timerStart: false,
                    timerReset: true,
                  })

                  setTimeout(() => { 
                    this.setState({
                      timerStart: true,
                      totalDuration: 20000,
                      timerReset: false,
                      resend_email: false,
                      status_page: "hp sukses"
                    })
                  }, 800) 
                }}
              >
                <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Verifikasi OTP</Text>
              </TouchableHighlight>

      </View>
    )
  }

  form_cekhp()
  {
    return(
      <View style={{width: "100%", height: "100%"}}>

          <View style={{width: "100%", flexDirection: "row", position: 'absolute', top:10}}>
            <View style={{width: "10%", height: "100%"}}>
            </View>

            <View style={{width: "80%", height: "100%"}}>
            </View>           

            <View style={{width: "10%", height: "100%"}}>
              <TouchableHighlight
                onPress={()=> { 
                  // this.setState({status_page: "cek email"}) 
                } }
              >
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  ✖️
                </Text>
              </TouchableHighlight>
            </View> 
          </View>


              <View style={{height: 128, width: 168, alignSelf: "center", marginTop: 48, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={iconhp}
                />
              </View>

              <Text style={{fontSize: 18, color: "black", alignSelf: "center", fontWeight: "bold"}}>
                Verifikasi No. Handphone
              </Text>    

              <View style={{width: "80%", height: 188, alignSelf: "center", marginTop: 28}}>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  Kode OTP akan kami kirimkan ke Nomor
                </Text>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  6285891238887
                </Text>
              </View>      




              <TouchableHighlight
                style={{borderRadius: 8, alignSelf: "center", marginTop: 23, marginBottom: 13,width: "90%", height: 60, backgroundColor: "#FFA500"}}
                onPress={() => { this.setState({status_page: "verifikasi hp"}) }}
              >
                <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Verifikasi OTP</Text>
              </TouchableHighlight>

      </View>
    )
  }

  form_emailsukses()
  {
    return(
      <View style={{width: "100%", height: "100%"}}>

          <View style={{width: "100%", flexDirection: "row", position: 'absolute', top:10}}>
            <View style={{width: "10%", height: "100%"}}>
            </View>

            <View style={{width: "80%", height: "100%"}}>
            </View>           

            <View style={{width: "10%", height: "100%"}}>
              <TouchableHighlight
                onPress={()=> { 
                  // this.setState({status_page: "cek email"}) 
                } }
              >
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  ✖️
                </Text>
              </TouchableHighlight>
            </View> 
          </View>


              <View style={{height: 128, width: 218, alignSelf: "center", marginTop: 48, justifyContent: "center"}}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch"
                  }}
                  circle
                  source={emailsukses}
                />
              </View>

              <Text style={{fontSize: 18, color: "black", alignSelf: "center", fontWeight: "bold"}}>
                Sukses !
              </Text>    

              <View style={{width: "80%", height: 188, alignSelf: "center", marginTop: 28}}>
                <Text style={{fontSize: 13, color: "black", alignSelf: "center"}}>
                  Email telah diverifikasi. Selanjutnya Silahkan Verifikasi Nomor Handphone yang telah terdaftar
                </Text>
              </View>      


              <TouchableHighlight
                style={{borderRadius: 8, alignSelf: "center", marginTop: 13, marginBottom: 13,width: "90%", height: 60, backgroundColor: "#FFA500"}}
                onPress={() => { this.setState({status_page: "cek hp"}) }}
              >
                <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Selanjutnya</Text>
              </TouchableHighlight>

      </View>
    )
  }

  form_loading()
  {
    return(
      <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', height: "100%", width: "100%"}}>
        <View style={{flex:2, paddingTop: "25%", alignSelf: "center", justifyContent: "center", height: 250}}>
          
          <View style={{width: 98, height: 98, alignSelf: "center", marginTop: "88%"}}>
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={loading}
            />
          </View>

        </View>
      </View>
    )
  }
  
  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>

                      <Modal
                        visible={this.state.isLoading}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={ () => { this.setState({isLoading: false}) } } 
                        initWidth={800} 
                        initHeight={400}
                      >
                        {this.form_loading()}
                      </Modal>

                      
        <View style={{width: "90%", alignSelf: "center", height: "83%", backgroundColor: "white"}}>
          {this.form_validasi()}
        </View>

        {this.form_footer()}

      </View>
    );
  }
}

const PendanaScreen = reduxForm({
  form: "PendanaScreen"
})(PendanaScreenForm);

function bindAction(dispatch) {
  return {
    fetchDataLoginpendana: body_loginpendana => dispatch(loginpendanaFetchData(body_loginpendana)),
    fetchDatapreregister: body_preregister => dispatch(preregisterFetchData(body_preregister)),
    fetchDataverifikasiemail: body_verifikasiemail => dispatch(verifikasiemailFetchData(body_verifikasiemail))
  };
}
const mapStateToProps = state => ({
  data_loginpendana: state.pendanaReducer.data_loginpendana,
  data_preregister: state.pendanaReducer.data_preregister,
  data_verifikasiemail: state.pendanaReducer.data_verifikasiemail,
});


export default connect(mapStateToProps, bindAction)(PendanaScreen);