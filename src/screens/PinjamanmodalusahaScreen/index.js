import React from 'react';
import { View, Text, Alert, Image, TouchableHighlight, Modal, TextInput } from 'react-native';
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

class PinjamanmodalusahaScreenForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sigaturefailed: true,
      sigatureoke: false,
      nama_register: "",
      tgllahir_register: "",
      tgllahir_register_stat: false,

      fhoto_ktp: "",
      fhoto_ktp_status: false,
      fhoto_selfiektp: "",
      fhoto_selfiektp_status: false,

      status_page: "awal",
      cameraktp: false,
      cameraktpselfie: false,

      zoomcamera: 0,
      ratio: '16:9',
      autoFocus: 'on',
      cameraType: "front",
      camera: false,

      tenor60: false,
      tenor75: false,
      tenor90: false,
      tenor120: false,

      tenor180: false,
      tenor360: false,
      tenor720: false
    }
  }

  
  form_sigatureoke()
  {
    return(
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>

        <View style={{width: 300, height: 233, alignSelf: "center", marginTop: 13}}>
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={cekttdoke}
            />
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 20}}>
          <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold" }}>
            Cek Tanda Tangan Digital Sudah Aktif
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 8}}>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>
            Sekarang kamu bisa melakukan
          </Text>
          <Text style={{ alignSelf: "center", fontSize: 18, marginTop: 3 }}>
            pendanaan untuk UMKM atau
          </Text>
          <Text style={{ alignSelf: "center", fontSize: 18, marginTop: 3 }}>
            perusahaan
          </Text>

          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 38,width: "100%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            // onPress={() => { this.setState({
            //   status_page: "isidataprofile",
            //   sigatureoke: false
            // }) }}
            onPress={() => { this.setState({
              status_page: "notifikasi",
              sigatureoke: false
            }) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Tutup</Text>
          </TouchableHighlight>
        </View>



      </View>
    )
  }
 
  form_sigaturefailed()
  {
    return(
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>

        <View style={{width: 300, height: 233, alignSelf: "center", marginTop: 13}}>
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={cekttdgagal}
            />
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 20}}>
          <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold" }}>
            Cek Tanda Tangan Digital Gagal
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 8}}>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>
            Silahkan Perbaharui Data Anda untuk
          </Text>
          <Text style={{ alignSelf: "center", fontSize: 18, marginTop: 3 }}>
            keperluan Tanda Tangan Digital
          </Text>

          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 38,width: "100%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            onPress={() => { this.setState({sigaturefailed: false}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Perbaharui Data</Text>
          </TouchableHighlight>
        </View>



      </View>
    )
  }

  form_tombolkonfirmasi()
  {
    if(this.state.fhoto_ktp == "" && this.state.fhoto_selfiektp == "")
    {
      return(
        <View>

          <TouchableHighlight
            disabled={true}
            style={{alignSelf: "center", marginTop: 68,width: "90%", height: 60, backgroundColor: "#D3D3D3", borderRadius: 8}}
            onPress={() => { this.setState({sigatureoke: true}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Konfirmasi</Text>
          </TouchableHighlight>

        </View>
      )
    }
    else if(this.state.fhoto_ktp != "" && this.state.fhoto_selfiektp != "")
    {
      return(
        <View>

          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 68,width: "90%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            onPress={() => { this.setState({sigatureoke: true}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Konfirmasi</Text>
          </TouchableHighlight>

        </View>
      )
    }
  }

  form_tombolkonfirmasi_ktp()
  {
    if(this.state.fhoto_ktp == "")
    {
      return(
        <View>

          <TouchableHighlight
            disabled={true}
            style={{alignSelf: "center", marginTop: 68,width: "90%", height: 60, backgroundColor: "#D3D3D3", borderRadius: 8}}
            onPress={() => { this.setState({status_page: "awal"}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Konfirmasi</Text>
          </TouchableHighlight>

        </View>
      )
    }
    else if(this.state.fhoto_ktp != "")
    {
      return(
        <View>

          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 68,width: "90%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            onPress={() => { this.setState({status_page: "awal"}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Konfirmasi</Text>
          </TouchableHighlight>

        </View>
      )
    }
  }

  form_tombolkonfirmasi_ktpselfie()
  {
    if(this.state.fhoto_selfiektp == "")
    {
      return(
        <View>

          <TouchableHighlight
            disabled={true}
            style={{alignSelf: "center", marginTop: 68,width: "90%", height: 60, backgroundColor: "#D3D3D3", borderRadius: 8}}
            onPress={() => { this.setState({status_page: "awal"}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Konfirmasi</Text>
          </TouchableHighlight>

        </View>
      )
    }
    else if(this.state.fhoto_selfiektp != "")
    {
      return(
        <View>

          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 68,width: "90%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            onPress={() => { this.setState({status_page: "awal"}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Konfirmasi</Text>
          </TouchableHighlight>

        </View>
      )
    }
  }

  mandatory_card_ktp()
  {
    if(this.state.fhoto_ktp == "")
    {
        return(
          <View>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "stretch"
                    }}
                    circle
                    source={danger}
                  />
          </View>
        )
    }
    if(this.state.fhoto_ktp != "")
    {
        return(
          <View>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "stretch"
                    }}
                    circle
                    source={checklist}
                  />
          </View>
        )
    }
  }

  mandatory_card_ktpselfie()
  {
    if(this.state.fhoto_selfiektp == "")
    {
        return(
          <View>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "stretch"
                    }}
                    circle
                    source={danger}
                  />
          </View>
        )
    }
    if(this.state.fhoto_selfiektp != "")
    {
        return(
          <View>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "stretch"
                    }}
                    circle
                    source={checklist}
                  />
          </View>
        )
    }
  }

  async ambilgambarktp()
  {
    if (this.camera) {
      const options = { quality: 0.15, base64: true };
      const data = await this.camera.takePictureAsync(options);

      var respon_link = data.uri
      const manipResult = await RNImageManipulator.manipulate(
        respon_link,
        [{ rotate: 0 }],
        { format: "png" }
      );


      // const blurryScores: Blurriness.BlurryScores = await Blurriness.getBlurrinessAll([respon_link]);
      // Alert.alert("",JSON.stringify(blurryScores))

      // Alert.alert("manipResultmanipResult",JSON.stringify(manipResult.path))

      ImgToBase64.getBase64String(manipResult.uri)
      .then(base64String => {
        this.setState({
          fhoto_ktp: base64String,
          cameraktp: false
        })
        this.processFaces(manipResult.uri, "ktp")
      })
      .catch(err => console.log(err))
    }
  }

  async ambilgambarktpselfie()
  {
    if (this.camera) {
      const options = { quality: 0.15, base64: true };
      const data = await this.camera.takePictureAsync(options);

      var respon_link = data.uri
      const manipResult = await RNImageManipulator.manipulate(
        respon_link,
        [{ rotate: 0 }],
        { format: "png" }
      );

      // const blurryScores: Blurriness.BlurryScores = await Blurriness.getBlurrinessAll([respon_link]);
      // Alert.alert("",JSON.stringify(blurryScores))

      // Alert.alert("manipResultmanipResult",JSON.stringify(manipResult.path))

      ImgToBase64.getBase64String(manipResult.uri)
      .then(base64String => {
        this.setState({
          fhoto_selfiektp: base64String,
          cameraktpselfie: false
        })
        this.processFaces(manipResult.uri, "ktpselfie")
      })
      .catch(err => console.log(err))
    }
  }

async processFaces(imagePath, status) {
  const options = {
    landmarkMode: FaceDetectorLandmarkMode.ALL,
    contourMode: FaceDetectorContourMode.ALL
  };

  const faces = await FaceDetection.processImage(imagePath, options);

  if(status == "ktp")
  {
    if(JSON.stringify(faces) != "[]")
    {
      this.setState({fhoto_ktp_status: true})
    }
    else if(JSON.stringify(faces) == "[]")
    {
      this.setState({fhoto_ktp_status: false})
    }
  }

  else if(status == "ktpselfie")
  {
    if(JSON.stringify(faces) != "[]")
    {
      this.setState({fhoto_selfiektp_status: true})
    }
    else if(JSON.stringify(faces) == "[]")
    {
      this.setState({fhoto_selfiektp_status: false})
    }
  }

  // Alert.alert("face face",JSON.stringify(faces))

  // faces.forEach(face => {
  //   console.log('Head rotation on X axis: ', face.headEulerAngleX);
  //   console.log('Head rotation on Y axis: ', face.headEulerAngleY);
  //   console.log('Head rotation on Z axis: ', face.headEulerAngleZ);
  //   console.log('Left eye open probability: ', face.leftEyeOpenProbability);
  //   console.log('Right eye open probability: ', face.rightEyeOpenProbability);
  //   console.log('Smiling probability: ', face.smilingProbability);
    // Alert.alert("face face face",JSON.stringify(face.faceContours))
    // face.faceContours.forEach(contour => {
    //   // Alert.alert("contour contour contour",JSON.stringify(contour))
    //   if (contour.type === FaceContourType.FACE) {
    //     console.log('Face outline points: ', contour.points);
    //     Alert.alert("Face point", contour.points)
    //   }
    // });
    // face.landmarks.forEach(landmark => {
    //   // Alert.alert("landmark landmark landmark",JSON.stringify(landmark))
    //   if (landmark.type === FaceLandmarkType.LEFT_EYE) {
    //     console.log('Left eye outline points: ', landmark.points);
    //   } else if (landmark.type === FaceLandmarkType.RIGHT_EYE) {
    //     console.log('Right eye outline points: ', landmark.points);
    //     Alert.alert("Eye point", contour.points)
    //   }
    // });
  // });


}





  form_awal()
  {
    return(
      <View>

          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 1, marginTop: 38 }}>
            Nama
          </Text>
          <TextInput 
            style={{width: "100%", height: 48, alignSelf: "center", borderWidth: 1, borderColor: "black", borderRadius: 8}}
            onChangeText={(text)=> {this.setState({nama_register: text})} }
          />



          <Text style={{ alignSelf: "flex-start", fontSize: 13, paddingLeft: 1, marginTop: 12 }}>
            Tanggal Lahir
          </Text>

          <TouchableHighlight
            style={{width: "100%", height: 48, alignSelf: "center", borderWidth: 1, borderColor: "black", borderRadius: 8}}
            onPress={() => { this.setState({tgllahir_register_stat: true}) }}
          >
            <View style={{flexDirection: "row", width: "100%"}}>
              <View style={{width: "80%"}}>
                <Text style={{fontSize: 20, color: "black", alignSelf: "flex-start", marginTop: 13}}>{this.state.tgllahir_register}</Text>
              </View>
              <View style={{width: "20%"}}>
                <Text style={{fontSize: 20, color: "black", alignSelf: "flex-end", marginTop: 9, paddingRight: 9}}> 🗓️ </Text>
              </View>
            </View>
          </TouchableHighlight>

          <DateTimePickerModal
            isVisible={this.state.tgllahir_register_stat}
            mode="date"
            display="default"

            onConfirm={(date)=> {
              var dateconvert = JSON.stringify(date).substring(1,11)
              this.setState({
                tgllahir_register: dateconvert,
                tgllahir_register_stat: false
              })
            } }
            onCancel={()=> {this.setState({tgllahir_register_stat: false})} }
          />






          <View 
            style={{
              width: "100%", 
              marginTop: 23,

              borderRightWidth: 3, 
              borderLeftWidth: 3,
              borderBottomWidth: 3,
              borderTopWidth: 1,  

              borderRightColor: "#F8F8FF", 
              borderLeftColor: "#F8F8FF", 
              borderBottomColor: "#F8F8FF", 
              borderTopColor: "#F8F8FF", 
              borderRadius: 18,
            }}
          >
            <Text style={{ alignSelf: "flex-start", fontSize: 13, marginTop: 13, marginLeft: 8 }}>
             e-KTP
            </Text>
            <View style={{flexDirection: "row"}}>
              <TouchableHighlight
                style={{alignSelf: "flex-start", marginBottom: 8, marginTop: 8, marginLeft: 8, width: "30%", height: 38, backgroundColor: "#008080", borderRadius: 8}}
                onPress={() => { this.setState({status_page: "ektp"}) }}
              >
                <Text style={{fontSize: 12, color: "white", alignSelf: "center", marginTop: 8}}>Lihat</Text>
              </TouchableHighlight>

              <View style={{marginLeft: 13, width: 18, height: 18, alignSelf: "center", marginTop: 3}}>
                {this.mandatory_card_ktp()}
              </View>
            </View>
          </View>

          <View 
            style={{
              width: "100%", 
              marginTop: 13,

              borderRightWidth: 3, 
              borderLeftWidth: 3,
              borderBottomWidth: 3,
              borderTopWidth: 1,  

              borderRightColor: "#F8F8FF", 
              borderLeftColor: "#F8F8FF", 
              borderBottomColor: "#F8F8FF", 
              borderTopColor: "#F8F8FF", 
              borderRadius: 18,
            }}
          >
            <Text style={{ alignSelf: "flex-start", fontSize: 13, marginTop: 13, marginLeft: 8 }}>
             Selfie Tanpa KTP
            </Text>
            <View style={{flexDirection: "row"}}>
              <TouchableHighlight
                style={{alignSelf: "flex-start", marginBottom: 8, marginTop: 8, marginLeft: 8, width: "30%", height: 38, backgroundColor: "#008080", borderRadius: 8}}
                onPress={() => { this.setState({status_page: "ktpselfie"}) }}
              >
                <Text style={{fontSize: 12, color: "white", alignSelf: "center", marginTop: 8}}>Lihat</Text>
              </TouchableHighlight>

              <View style={{marginLeft: 13, width: 18, height: 18, alignSelf: "center", marginTop: 3}}>
                  {this.mandatory_card_ktpselfie()}
              </View>
            </View>
          </View>
          
          {this.form_tombolkonfirmasi()}

      </View>
    )
  }

  ektp_qualityimage()
  {
    if(this.state.fhoto_ktp_status == false)
    {
      return(
        <View>
          <View
            style={{alignSelf: "center", marginBottom: 1, width: "100%", height: 60, backgroundColor: "#CD5C5C"}}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Foto Selfie Tidak Jelas</Text>
          </View>
        </View>
      )
    }
  }

  fhoto_ektp()
  {
    if(this.state.fhoto_ktp != "")
    {
      return(
        <View>
          <Image 
            source={{ uri: `data:image/png;base64,${this.state.fhoto_ktp}` }}
            style={{width: "100%", height: "100%", resizeMode: "stretch"}} 
          />
          
        </View>
      )
    }
    else if(this.state.fhoto_ktp == "")
    {
      return(
        <View>
          <Image 
            source={iconselfie}
            style={{width: "100%", height: "100%", resizeMode: "stretch"}} 
          />

        </View>
      )
    }
  }

  gantifhoto_ektp()
  {
    // if(this.state.fhoto_ektp != "")
    // {
      return(
        <View>
          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 9,width: "90%", height: 60, backgroundColor: "#1E90FF", borderRadius: 8}}
            onPress={() => { this.setState({cameraktp: true}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Ganti Fhoto</Text>
          </TouchableHighlight>
        </View>
      )
    // }
    // else if(this.state.fhoto_ektp == "")
    // {
    //   return(
    //     <View>
    //       <TouchableHighlight
    //         disabled={false}
    //         style={{alignSelf: "center", marginTop: 9,width: "90%", height: 60, backgroundColor: "#DCDCDC", borderRadius: 8}}
    //         onPress={() => { this.setState({cameraktp: true}) }}
    //       >
    //         <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Ganti Fhoto</Text>
    //       </TouchableHighlight>
    //     </View>
    //   )
    // }
  }

  form_ektp()
  {
    if(this.state.cameraktp == false)
    {
      return(
        <View>

          <View style={{width: "90%", height: "38%", borderWidth: 1, borderColor: "black", backgroundColor: "white", marginTop: 19, alignSelf: "center"}}>
            {this.fhoto_ektp()}
            
          </View>
          <View style={{width: "90%", backgroundColor: "white", alignSelf: "center"}}>
            {this.ektp_qualityimage()}
          </View>

          {this.gantifhoto_ektp()}

          <View style={{marginTop: "28%"}}>
            {this.form_tombolkonfirmasi_ktp()}
          </View>

        </View>
      )
    }
    else if(this.state.cameraktp == true)
    {
      return(
        <View>

          <View
            style={{
              justifyContent: 'center',
              height: "98%",
              paddingTop: 19,
              marginTop: 19,
              borderRadius: 23,
              overflow: 'hidden'
            }}
          >
                    <RNCamera
                      ref={ref => {
                        this.camera = ref;
                      }}

                      style={{height: "100%"}}
                      
                      type={this.state.cameraType}
                      captureAudio={false}
                      zoom={this.state.zoomcamera}
                      ratio={this.state.ratio}
                    >

                    <TouchableHighlight
                      style={{alignSelf: "center", marginTop: "148%"}}
                      onPress={()=>this.ambilgambarktp()}
                    >
                      <Text style={{fontSize: 60, color: "black", alignSelf: "center"}}>🔴</Text>
                    </TouchableHighlight>

                    </RNCamera>
          </View>

        </View>
      )
    }
  }

  ektpselfie_qualityimage()
  {
    if(this.state.fhoto_selfiektp_status == false)
    {
      return(
        <View>
          <View
            style={{alignSelf: "center", marginBottom: 1, width: "100%", height: 60, backgroundColor: "#CD5C5C"}}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Foto Selfie Tidak Jelas</Text>
          </View>
        </View>
      )
    }
  }

  fhoto_ektpselfie()
  {
    if(this.state.fhoto_selfiektp != "")
    {
      return(
        <View>
          <Image 
            source={{ uri: `data:image/png;base64,${this.state.fhoto_selfiektp}` }}
            style={{width: "100%", height: "100%", resizeMode: "stretch"}} 
          />
          
        </View>
      )
    }
    else if(this.state.fhoto_selfiektp == "")
    {
      return(
        <View>
          <Image 
            source={iconselfie}
            style={{width: "100%", height: "100%", resizeMode: "stretch"}} 
          />

        </View>
      )
    }
  }

  gantifhoto_ektpselfie()
  {
    // if(this.state.fhoto_selfiektp != "")
    // {
      return(
        <View>
          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 9,width: "90%", height: 60, backgroundColor: "#1E90FF", borderRadius: 8}}
            onPress={() => { this.setState({cameraktpselfie: true}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Ganti Fhoto</Text>
          </TouchableHighlight>
        </View>
      )
    // }
    // else if(this.state.fhoto_selfiektp == "")
    // {
    //   return(
    //     <View>
    //       <TouchableHighlight
    //         disabled={false}
    //         style={{alignSelf: "center", marginTop: 9,width: "90%", height: 60, backgroundColor: "#DCDCDC", borderRadius: 8}}
    //         onPress={() => { this.setState({cameraktpselfie: true}) }}
    //       >
    //         <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Ganti Fhoto</Text>
    //       </TouchableHighlight>
    //     </View>
    //   )
    // }
  }

  form_ektpselfie()
  {
    if(this.state.cameraktpselfie == false)
    {
      return(
        <View>

          <View style={{width: "90%", height: "38%", borderWidth: 1, borderColor: "black", backgroundColor: "white", marginTop: 19, alignSelf: "center"}}>
            {this.fhoto_ektpselfie()}
            
          </View>
          <View style={{width: "90%", backgroundColor: "white", alignSelf: "center"}}>
            {this.ektpselfie_qualityimage()}
          </View>

          {this.gantifhoto_ektpselfie()}

          <View style={{marginTop: "28%"}}>
            {this.form_tombolkonfirmasi_ktpselfie()}
          </View>

        </View>
      )
    }
    else if(this.state.cameraktpselfie == true)
    {
      return(
        <View>

          <View
            style={{
              justifyContent: 'center',
              height: "98%",
              paddingTop: 19,
              marginTop: 19,
              borderRadius: 23,
              overflow: 'hidden'
            }}
          >
                    <RNCamera
                      ref={ref => {
                        this.camera = ref;
                      }}

                      style={{height: "100%"}}
                      
                      type={this.state.cameraType}
                      captureAudio={false}
                      zoom={this.state.zoomcamera}
                      ratio={this.state.ratio}
                    >

                    <View style={{borderStyle: 'dotted', borderColor: "red", borderWidth: 2, width: "69%", height: 149, alignSelf: "center", marginTop: "89%"}}>

                    </View>

                    <TouchableHighlight
                      style={{alignSelf: "center", marginTop: "2%"}}
                      onPress={()=>this.ambilgambarktpselfie()}
                    >
                      <Text style={{fontSize: 60, color: "black", alignSelf: "center"}}>🔴</Text>
                    </TouchableHighlight>

                    </RNCamera>
          </View>

        </View>
      )
    }
  }

  form_isidataprofile()
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
              <View style={{marginLeft: 8, width: 23, height: 23, alignSelf: "flex-start", marginTop: 13}}>
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "stretch"
                      }}
                      circle
                      source={checklist}
                    />
              </View>
              <Text style={{fontSize: 13, color: "black", alignSelf: "flex-start", marginTop: 13, marginLeft: 13}}>Data Perusahaan</Text>
            </View>
          </TouchableHighlight>



          <TouchableHighlight
            style={{width: "100%", height: 49, borderWidth: 1, borderColor: "#D3D3D3", backgroundColor: "#F8F8FF", marginTop: 13}}
          >
            <View style={{flexDirection: "row"}}>
              <View style={{marginLeft: 8, width: 23, height: 23, alignSelf: "flex-start", marginTop: 13}}>
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "stretch"
                      }}
                      circle
                      source={checklist}
                    />
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

  form_notifikasi()
  {
    return(
      <View>

        <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row", justifyContent: "center"}}>
          <View style={{width: "25%", height: "100%"}}>
          </View>

          <View style={{width: "50%", height: "100%"}}>
            <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "center", marginTop: 13}}>Notifikasi</Text>
          </View>
         
          <View style={{width: "25%", height: "100%"}}>
            <TouchableHighlight
              style={{alignSelf: "center", marginTop: 9}}
              onPress={()=>{this.setState({status_page: "isidataprofile"})} }
            >
              <Text style={{fontSize: 16, color: "black", alignSelf: "center"}}>✖️</Text>
            </TouchableHighlight>
          </View>
         
        </View>


        <View style={{width: 200, height: 133, alignSelf: "center", marginTop: 188}}>
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              circle
              source={unnotif}
            />
        </View>

      </View>
    )
  }

  form_filter()
  {
    return(
      <View>
        
        <View style={{width: "130%", height: 50, borderBottomWidth: 3, borderBottomColor: "#F8F8FF", alignSelf: "center", flexDirection: "row", justifyContent: "center"}}>
          <View style={{width: "25%", height: "100%"}}>
          </View>

          <View style={{width: "50%", height: "100%"}}>
            <Text style={{fontSize: 13, color: "#48D1CC", alignSelf: "center", marginTop: 13}}>Filter</Text>
          </View>
         
          <View style={{width: "25%", height: "100%"}}>
            <TouchableHighlight
              style={{alignSelf: "center", marginTop: 9}}
              onPress={()=>{this.setState({status_page: "isidataprofile"})} }
            >
              <Text style={{fontSize: 16, color: "black", alignSelf: "center"}}>✖️</Text>
            </TouchableHighlight>
          </View>         
        </View>


        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 13}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "bold", paddingLeft: 6 }}>
            Kategori Peminjam
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 13}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 6 }}>
            Pinjaman UMKM Individu DavestPay
          </Text>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 6 }}>
            Pinjaman Perusahaan
          </Text>

          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 13, marginTop: 8 }}>
            PT
          </Text>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 13 }}>
            CV
          </Text>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 13 }}>
            UD
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 13}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "bold", paddingLeft: 6 }}>
            Urut Berdasarkan
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 13}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 6 }}>
            Pinjaman Terbaru ke Terlama
          </Text>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 6 }}>
            Pinjaman Terlama ke Terbaru
          </Text>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 6 }}>
            Pinjaman Terbesar ke Terkecil
          </Text>
          <Text style={{ alignSelf: "flex-start", fontSize: 16, paddingLeft: 6 }}>
            Pinjaman Terkecil ke Terbesar
          </Text>
        </View>

        <View style={{width: "90%", alignSelf: "center", justifyContent: "center", marginTop: 13}}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "bold", paddingLeft: 6 }}>
            Lama Tenor
          </Text>
        </View>

        <View style={{paddingLeft: 18, width: "90%", alignSelf: "flex-start", justifyContent: "flex-start", marginTop: 13, flexDirection: "row"}}>
          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor60}
              onValueChange={()=> { this.setState({tenor60: !this.state.tenor60}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>60 Hari</Text>
          </View>

          <View style={{width: "2%"}}></View>

          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor75}
              onValueChange={()=> { this.setState({tenor75: !this.state.tenor75}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>75 Hari</Text>
          </View>

          <View style={{width: "2%"}}></View>

          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor90}
              onValueChange={()=> { this.setState({tenor90: !this.state.tenor90}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>90 Hari</Text>
          </View>

          <View style={{width: "2%"}}></View>

          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor120}
              onValueChange={()=> { this.setState({tenor120: !this.state.tenor120}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>120 Hari</Text>
          </View>
        </View>



        <View style={{paddingLeft: 18, width: "90%", alignSelf: "flex-start", justifyContent: "flex-start", marginTop: 13, flexDirection: "row"}}>
          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor180}
              onValueChange={()=> { this.setState({tenor60: !this.state.tenor180}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>180 Hari</Text>
          </View>

          <View style={{width: "2%"}}></View>

          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor360}
              onValueChange={()=> { this.setState({tenor360: !this.state.tenor360}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>360 Hari</Text>
          </View>

          <View style={{width: "2%"}}></View>

          <View style={{flexDirection: "row"}}>
            <CheckBox
              value={this.state.tenor720}
              onValueChange={()=> { this.setState({tenor720: !this.state.tenor720}) } }
              style={{alignSelf: "center"}}
            />
            <Text style={{fontSize: 9, marginTop: 8}}>720 Hari</Text>
          </View>
        </View>


          <TouchableHighlight
            style={{alignSelf: "center", marginTop: 98,width: "100%", height: 60, backgroundColor: "#FFA500", borderRadius: 8}}
            onPress={() => { this.setState({status_page: "filter"}) }}
          >
            <Text style={{fontSize: 20, color: "white", alignSelf: "center", marginTop: 13}}>Terapkan Filter</Text>
          </TouchableHighlight>



      </View>
    )
  }

  form_validasi()
  {
    if(this.state.status_page == "awal")
    {
      return (this.form_awal())
    }
    if(this.state.status_page == "ektp")
    {
      return (this.form_ektp())
    }
    if(this.state.status_page == "ktpselfie")
    {
      return (this.form_ektpselfie())
    }
    if(this.state.status_page == "isidataprofile")
    {
      return (this.form_isidataprofile())
    }
    if(this.state.status_page == "notifikasi")
    {
      return (this.form_notifikasi())
    }
    if(this.state.status_page == "filter")
    {
      return (this.form_filter())
    }
  }

  form_footer()
  {
    if(this.state.status_page != "notifikasi")
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
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: "white" }}>

                      <Modal
                        visible={this.state.sigaturefailed}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={ () => { this.setState({sigaturefailed: false}) } } 
                        initWidth={800} 
                        initHeight={400}
                      >
                        {this.form_sigaturefailed()}
                      </Modal>


                      <Modal
                        visible={this.state.sigatureoke}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={ () => { this.setState({sigatureoke: false}) } } 
                        initWidth={800} 
                        initHeight={400}
                      >
                        {this.form_sigatureoke()}
                      </Modal>

        <View style={{width: "90%", alignSelf: "center", height: "83%", backgroundColor: "white"}}>
          {this.form_validasi()}
        </View>

        {this.form_footer()}

        

      </View>
    );
  }
}

const PinjamanmodalusahaScreen = reduxForm({
  form: "PinjamanmodalusahaScreen"
})(PinjamanmodalusahaScreenForm);

function bindAction(dispatch) {
  return {
    
  };
}
const mapStateToProps = state => ({
  
});


export default connect(mapStateToProps, bindAction)(PinjamanmodalusahaScreen);