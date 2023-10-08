import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Dashboard, Laporan, LayoutAdmin, Login, LupaPassword, Produk, Profile, ResetPassword, User } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        {/* <Route
          path="/auth/reset-password/:id/:token"
          element={<ResetPassword />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} /> */}

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="produk" element={<Produk />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="settings" element={<Profile />} />
        </Route>
        {/* <Route path="/dashboard/User" element={<User />} />
        <Route path="/dashboard/Report" element={<Report />} />
        <Route path="/dashboard/Produk" element={<Produk />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

      {/* // *note : itu laporan ada 3 page : 
    // - laporan barang masuk = itu laporan barang masuk dari petugas kayaknya ada di masuki oleh siapa gitu
    // - laporan stok habis = itu nampilin barang yang stoknya habis
    // - laporan laba rugi (gw gak tau klo yang ini soalnya belum di kasih tau ama pak nur / pak ihsan) 
    // intinya laba rugi itu (buat keuangan dari transaksi keuangan yang berjalan selama satu bulan atau satu tahun baik transaksi yang menghasilkan kerugian maupun laba,
    // Akumulasi dari total finansial tersebut yang akan menjadi laporan laba rugi perusahaan di periode tertentu.) 

    // *note : kalo profile terserah mau ngambil refrensi dari mana aja designnya gw recomended kayak instagram, tapi klo ada yang lebih bagus ya terserah lo  

    // total page :
    // login , forgot password, reset password , user + crud, produk + crud , laporan pemasukan , laporan stok habis , laporan laba rugi, profile ,edit profile */}
    </div>
  );
}

export default App;
