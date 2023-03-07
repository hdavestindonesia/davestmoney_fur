import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import SignIn from "./screens/SignIn";
import Overview from "./screens/Overview";
import Akun from "./screens/Akun";
// import AntarLifesWallet from "./screens/AntarLifesWallet";
import Bank from "./screens/Bank";
import BPJS from "./screens/BPJS";
import BuatSecurityCode from "./screens/BuatSecurityCode";
import CairkanSaldo from "./screens/CairkanSaldo";
import Camera from "./screens/Camera";
import Daftar from "./screens/Daftar";
import DaftarBerhasil from "./screens/DaftarBerhasil";
import DaftarCode from "./screens/DaftarCode";
import DataDiri from "./screens/DataDiri";
import DatePicker from "./screens/DatePicker";
import EditProfil from "./screens/EditProfil";
import FAQ from "./screens/FAQ";
import Game from "./screens/Game";
import History from "./screens/History";
import HistoryDetail from "./screens/HistoryDetail";
import HistoryPointDetail from "./screens/HistoryPointDetail";
import Home from "./screens/Home";
import HomeDetail from "./screens/HomeDetail";
import Hubungi from "./screens/Hubungi";
import Informasi from "./screens/Informasi";
import Kebijakan from "./screens/Kebijakan";
import KirimKe from "./screens/KirimKe";
import KodePromo from "./screens/KodePromo";
import KonfirmasiBPJS from "./screens/KonfirmasiBPJS";
import KonfirmasiCairkanSaldo from "./screens/KonfirmasiCairkanSaldo";
import KonfirmasiMultiFinance from "./screens/KonfirmasiMultiFinance";
import KonfirmasiPDAM from "./screens/KonfirmasiPDAM";
import KonfirmasiPembayaran from "./screens/KonfirmasiPembayaran";
import KonfirmasiPLN from "./screens/KonfirmasiPLN";
import KonfirmasiPulsa from "./screens/KonfirmasiPulsa";
import KonfirmasiTarikTunai from "./screens/KonfirmasiTarikTunai";
import KonfirmasiTelkom from "./screens/KonfirmasiTelkom";
import KonfirmasiTransfer from "./screens/KonfirmasiTransfer";
import KonfirmasiTVKabel from "./screens/KonfirmasiTVKabel";
import LihatTarikTunai from "./screens/LihatTarikTunai";
import LupaSecurityCode from "./screens/LupaSecurityCode";
import MasukkanCode from "./screens/MasukkanCode";
import MediaPicker from "./screens/MediaPicker";
import MerchantDetail from "./screens/MerchantDetail";
import MultiFinance from "./screens/MultiFinance";
import Notification from "./screens/Notification";
import PDAM from "./screens/PDAM";
import PembayaranMasuk from "./screens/PembayaranMasuk";
import PembayaranSukses from "./screens/PembayaranSukses";
import PembayaranTagihan from "./screens/PembayaranTagihan";
import Penarikan from "./screens/Penarikan";
import PickerList from "./screens/PickerList";
import PLN from "./screens/PLN";
import PromoDetail from "./screens/PromoDetail";
import Pulsa from "./screens/Pulsa";
import QRCode from "./screens/QRCode";
import QRMaker from "./screens/QRMaker";
import Saran from "./screens/Saran";
import ScanQR from "./screens/ScanQR";
import SecurityCodeAnda from "./screens/SecurityCodeAnda";
import SecurityCodeBaru from "./screens/SecurityCodeBaru";
import SemuaProduk from "./screens/SemuaProduk";
import SendMoney from "./screens/SendMoney";
import SignInCode from "./screens/SignInCode";
import SyaratKetentuan from "./screens/SyaratKetentuan";
import TarikTunai from "./screens/TarikTunai";
import TarikTunaiDetail from "./screens/TarikTunaiDetail";
import TarikTunaiSukses from "./screens/TarikTunaiSukses";
import Telkom from "./screens/Telkom";
import Tentang from "./screens/Tentang";
// import TerimaTarikTunai from "./screens/TerimaTarikTunai";
import TopUp from "./screens/TopUp";
import TransaksiGagal from "./screens/TransaksiGagal";
import TransaksiSukses from "./screens/TransaksiSukses";
import TransferBank from "./screens/TransferBank";
import TransferGagal from "./screens/TransferGagal";
import TransferSukses from "./screens/TransferSukses";
import TVKabel from "./screens/TVKabel";
import UbahAlamatEmail from "./screens/UbahAlamatEmail";
import UbahNomorHandphone from "./screens/UbahNomorHandphone";
import UlangSecurityCode from "./screens/UlangSecurityCode";
import Upgrade from "./screens/Upgrade";
import UploadFoto from "./screens/UploadFoto";
import VerifikasiEmail from "./screens/VerifikasiEmail";
import WalletDeal from "./screens/WalletDeal";
import WalletPoint from "./screens/WalletPoint";


const AppNavigator = createStackNavigator(
  {
    SignIn: { screen: SignIn },
    Overview: { screen: Overview },

    Akun: { screen: Akun },
    // AntarLifesWallet: { screen: AntarLifesWallet },
    Bank: { screen: Bank },
    BPJS: { screen: BPJS },
    BuatSecurityCode: { screen: BuatSecurityCode },
    CairkanSaldo: { screen: CairkanSaldo },
    Camera: { screen: Camera },
    Daftar: { screen: Daftar },
    DaftarBerhasil: { screen: DaftarBerhasil },
    DaftarCode: { screen: DaftarCode },
    DataDiri: { screen: DataDiri },
    DatePicker: { screen: DatePicker },
    EditProfil: { screen: EditProfil },
    FAQ: { screen: FAQ },
    Game: { screen: Game },
    History: { screen: History },
    HistoryDetail: { screen: HistoryDetail },
    HistoryPointDetail: { screen: HistoryPointDetail },
    Home: { screen: Home },
    HomeDetail: { screen: HomeDetail },
    Hubungi: { screen: Hubungi },
    Informasi: { screen: Informasi },
    Kebijakan: { screen: Kebijakan },
    KirimKe: { screen: KirimKe },
    KodePromo: { screen: KodePromo },
    KonfirmasiBPJS: { screen: KonfirmasiBPJS },
    KonfirmasiCairkanSaldo: { screen: KonfirmasiCairkanSaldo },
    KonfirmasiMultiFinance: { screen: KonfirmasiMultiFinance },
    KonfirmasiPDAM: { screen: KonfirmasiPDAM },
    KonfirmasiPembayaran: { screen: KonfirmasiPembayaran },
    KonfirmasiPLN: { screen: KonfirmasiPLN },
    KonfirmasiPulsa: { screen: KonfirmasiPulsa },
    KonfirmasiTarikTunai: { screen: KonfirmasiTarikTunai },
    KonfirmasiTelkom: { screen: KonfirmasiTelkom },
    KonfirmasiTransfer: { screen: KonfirmasiTransfer },
    KonfirmasiTVKabel: { screen: KonfirmasiTVKabel },
    LihatTarikTunai: { screen: LihatTarikTunai },
    LupaSecurityCode: { screen: LupaSecurityCode },
    MasukkanCode: { screen: MasukkanCode },
    MediaPicker: { screen: MediaPicker },
    MerchantDetail: { screen: MerchantDetail },
    MultiFinance: { screen: MultiFinance },
    Notification: { screen: Notification },
    PDAM: { screen: PDAM },
    PembayaranMasuk: { screen: PembayaranMasuk },
    PembayaranSukses: { screen: PembayaranSukses },
    PembayaranTagihan: { screen: PembayaranTagihan },
    Penarikan: { screen: PickerList },
    PickerList: { screen: PickerList },
    PLN: { screen: PLN },
    PromoDetail: { screen: PromoDetail },
    Pulsa: { screen: Pulsa },
    QRCode: { screen: QRCode },
    QRMaker: { screen: QRMaker },
    Saran: { screen: Saran },
    ScanQR: { screen: ScanQR },
    SecurityCodeAnda: { screen: SecurityCodeAnda },
    SecurityCodeBaru: { screen: SecurityCodeBaru },
    SemuaProduk: { screen: SemuaProduk },
    SendMoney: { screen: SendMoney },
    SignInCode: { screen: SignInCode },
    SyaratKetentuan: { screen: SyaratKetentuan },
    TarikTunai: { screen: TarikTunaiDetail },
    TarikTunaiDetail: { screen: TarikTunaiDetail },
    TarikTunaiSukses: { screen: TarikTunaiSukses },
    Telkom: { screen: Telkom },
    Tentang: { screen: Tentang },
    // TerimaTarikTunai: { screen: TerimaTarikTunai },
    TopUp: { screen: TopUp },
    TransaksiGagal: { screen: TransaksiGagal },
    TransaksiSukses: { screen: TransaksiSukses },
    TransferBank: { screen: TransferBank },
    TransferGagal: { screen: TransferGagal },
    TransferSukses: { screen: TransferSukses },
    TVKabel: { screen: TVKabel },
    UbahAlamatEmail: { screen: UbahAlamatEmail },
    UbahNomorHandphone: { screen: UbahNomorHandphone },
    UlangSecurityCode: { screen: UlangSecurityCode },
    Upgrade: { screen: Upgrade },
    UploadFoto: { screen: UploadFoto },
    VerifikasiEmail: { screen: VerifikasiEmail },
    WalletDeal: { screen: WalletDeal },
    WalletPoint: { screen: WalletPoint },
  },
  {
    index: 0,
    initialRouteName: "SignIn",
    headerMode: "none",
    mode: 'modal'
  }
);

export default createAppContainer(AppNavigator);