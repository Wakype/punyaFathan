import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      silakan isi sendiri ya !!!  😚😚😚


      {/* <Routes>
      // Page Login
      <Route path="/login" element={<Login />} />
      <Route
      // Page Reset Password
        path="/auth/reset-password/:id/:token"
        element={<ResetPassword />}
      />
      // Page Forgot password
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          // Page Dashboard 
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboard/User"
        // Page User Crud
        element={
          <ProtectRoute>
            <User />
          </ProtectRoute>
        }
      />
      <Route
      // Page Laporan*
        path="/dashboard/Report"
        element={
          <ProtectRoute>
            <Report />
          </ProtectRoute>
        }
      />
      <Route
      // Page produk + CRUD
        path="/dashboard/Produk"
        element={
          <ProtectRoute>
            <Produk />
          </ProtectRoute>
        }
      />
      <Route
      // Page Profile* note profile ke-2
        path="/profile" 
        element={
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes> */}

    // *note : itu laporan ada 3 page : 
    // - laporan barang masuk
    // - laporan stok habis 
    // - laporan laba rugi (gw gak tau klo yang ini soalnya belum di kasih tau ama pak nur / pak ihsan) 
    // intinya laba rugi itu (buat keuangan dari transaksi keuangan yang berjalan selama satu bulan atau satu tahun baik transaksi yang menghasilkan kerugian maupun laba,
    // Akumulasi dari total finansial tersebut yang akan menjadi laporan laba rugi perusahaan di periode tertentu.) 

    // *note : kalo profile terserah mau ngambil refrensi dari mana aja designnya gw recomended kayak instagram, tapi klo ada yang lebih bagus ya terserah lo  

    // total page :
    // login , forgot password, reset password , user + crud, produk + crud , laporan pemasukan , laporan stok habis , laporan laba rugi, profile ,edit profile
    </div>
  );
}

export default App;
