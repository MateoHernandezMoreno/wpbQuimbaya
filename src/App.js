
import './style/styles.scss';
import Home from './components/container/home/Home.jsx'; // Asegúrate de que la ruta y nombre de los componentes son correctos.
// Verifica las rutas de importación.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/container/NavBar/NavBar.jsx'; // Corrige el nombre del archivo importado si es necesario.
import useFloatingButton from './components/hooks /Floatbuttom.jsx';
import Footer from './components/container/footer/Footer.jsx';
import Rooms from './components/container/rooms/Rooms.jsx';
import Contact from './components/container/Contact/Contact.jsx';
import Payments from './components/container/Payments/Payments.jsx';





function App() {
  const showButton = useFloatingButton(200)
  return (
    <div>

    <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/payments" element={<Payments/>}/>
        </Routes>
      </Router>
   <div>
   </div>
    <Footer></Footer>
      {showButton &&
      <button style={{position: 'fixed', bottom:'10px', right: "10px", background: '#ddd280', border: 'none'}}>
        <div className="footer-iconTop">
            <a href="#header">
                <svg
                   xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    style={{ fill: "#000" }}>
                     <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z" />
                </svg>
             </a>
        </div>
      </button>}
 


    </div>
  );
}

export default App;
