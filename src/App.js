import './style/styles.scss';
import Home from './components/container/home/Home.jsx'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBarPublic from './components/container/NavBar/NavBar.jsx'; 
import NavBarAdmin from './components/container/admin/navbar/NavBarAdmin.jsx'; 
import useFloatingButton from './components/hooks/Floatbuttom.jsx';
import Footer from './components/container/footer/Footer.jsx';
import Rooms from './components/container/rooms/Rooms.jsx';
import Contact from './components/container/Contact/Contact.jsx';
import Payments from './components/container/Payments/Payments.jsx';
import Admin from './components/container/admin/admin.jsx';
import Wall from './components/container/admin/components/index/index.jsx';

function App() {
  const showButton = useFloatingButton(200);

  // Envuelve la parte que necesita el Router dentro de un nuevo componente
  return (
    <Router>
      <AppContent showButton={showButton} />
    </Router>
  );
}

function AppContent({ showButton }) {
  const location = useLocation();

  // Mostrar navbar adecuado dependiendo de la ruta
  const renderNavBar = () => {
    if (location.pathname === '/admin') {
      return null; // No mostrar navbar en admin
    } else if (location.pathname === '/wall') {
      return <NavBarAdmin />; // Mostrar NavBarAdmin en la ruta "wall"
    } else {
      return <NavBarPublic />; // Mostrar NavBarPublic en las demás rutas
    }
  };

  return (
    <div>
      {renderNavBar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/wall" element={<Wall />} />
      </Routes>
      <Footer />
      {showButton && (
        <button style={{ position: 'fixed', bottom: '10px', right: '10px', background: '#ddd280', border: 'none' }}>
          <div className="footer-iconTop">
            <a href="#header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                style={{ fill: "#000" }}
              >
                <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z" />
              </svg>
            </a>
          </div>
        </button>
      )}
    </div>
  );
}

export default App;