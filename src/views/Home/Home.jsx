import './index.scss';
import Header from '../../components/Header/Header';
import Tarefas from '../../components/Tabela/Tarefas';
import { Routes } from 'react-router-dom';


const Home = () => {


    return (
        <div className='home'>
            <Header />
            <h1>Otimize seu tempo se organize com nosso Planejamento Diário</h1>
            <Tarefas/>
        </div>
   
    );
};

export default Home;