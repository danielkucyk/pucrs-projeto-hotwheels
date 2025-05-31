import { Link, useLocation} from 'react-router-dom';
import icon from '../../assets/icon.jpg'

export default function Navbar() {
    const location = useLocation ();

    return (
        <div className="flex justify-center bg-[#8c0708] gap-10 pl-10 py-5 content-center items-center h-15 text-xl font-mono text-white shadow-lg shadow-black">
            <img src={icon} className='h-20 w-20 rounded-lg' alt="Icone Hotwheels"/>
            <div>
                <Link to="/" className={location.pathname=== '/' ? 'font-bold underline' : 'capitalize'}>Home</Link>
            </div>
            <div>
                <Link to="/about" className={location.pathname=== '/about' ? 'font-bold underline' : 'capitalize'}>Sobre</Link>
            </div>
            <div>
                <Link to='/carsList' className={location.pathname=== '/carsList' ? 'font-bold underline' : 'capitalize'}>Carros</Link>
            </div>
            <div>
                <Link to='/carForm' className={location.pathname=== '/carForm' ? 'font-bold underline' : 'capitalize'}>Adicionar Carro</Link>
            </div>
        </div>
    )
}