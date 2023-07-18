import './index.scss';
import Header from '../../components/Header/Header';
import Tabela from '../../components/Tabela/Tabela';


const Home = () => {


    return (
        <div className='home'>
            <Header />
            <h1>Otimize seu tempo se organize com nosso Planejamento Diário</h1>
            <Tabela />
        </div>

    );
};

export default Home;