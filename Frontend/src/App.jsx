import {useEffect} from 'react'
import Navbar from './components/Navbar.jsx'
import './App.css'
import {Navigate} from 'react-router-dom'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import {useSelector,useDispatch} from 'react-redux'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import {checkAuth} from './store/authActions.js'
function App() {
  
const dispatch = useDispatch();

const {authUser,isCheckingAuth,onlineUsers}=useSelector((state)=> state.auth)
const theme=useSelector((state)=>state.theme.theme)
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  console.log(authUser)
  console.log(onlineUsers)
  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
  if(isCheckingAuth) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className='size-10 animate-spin' />
    </div>
  )
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage />: <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ? <LoginPage />: <Navigate to='/' />}/>
        <Route path='/settings' element={<SettingsPage />}/>
        <Route path='/profile' element={authUser ? <ProfilePage />: <Navigate to='/login'/>}/>

      </Routes>

<Toaster
  position="top-right"
  reverseOrder={false}
/>    </div>
  )
}

export default App
