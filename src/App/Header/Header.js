import './Header.css';
import logo from './monero-svgrepo-com.svg';

function Header() {
  return (
    <header className='Header'>
      <img src={logo} className='Header-logo' alt='logo' />
      <span>Monero Orderbooks</span>
    </header>
  );
}

export default Header;
