import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import WelcomePage  from './Pages/Welcome';

const App: React.FC = () =>{
    return (
        <div>
            <Header/>
            <WelcomePage/>
            <Footer/>
        </div>
    )
}

export default App;