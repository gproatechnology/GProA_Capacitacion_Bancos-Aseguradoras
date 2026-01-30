import logo from '../assets/logo.png';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo = ({ size = 'medium', className = '' }: LogoProps) => {
  return (
    <img 
      src={logo} 
      alt="GProA Logo" 
      className={`logo logo-${size} ${className}`}
    />
  );
};
