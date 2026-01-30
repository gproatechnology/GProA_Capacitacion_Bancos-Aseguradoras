import './UserAvatar.css';

// Importar avatares por defecto (prioridad PNG sobre SVG)
import avatar1 from '../assets/usuarios/avatar1.png';
import avatar2 from '../assets/usuarios/avatar2.png';
import avatar3 from '../assets/usuarios/avatar3.svg';
import avatar4 from '../assets/usuarios/avatar4.svg';
import avatar5 from '../assets/usuarios/avatar5.svg';

interface UserAvatarProps {
  /** URL de la imagen personalizada del usuario */
  customImage?: string;
  /** ID del usuario para seleccionar avatar por defecto */
  userId?: string | number;
  /** Tamaño del avatar: 'small' | 'medium' | 'large' | 'xlarge' */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Nombre del usuario para tooltip */
  alt?: string;
  /** Clase CSS adicional */
  className?: string;
}

// Mapeo de avatares disponibles
const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

/**
 * Genera un avatar por defecto basado en el ID del usuario
 * Usa el ID para seleccionar un avatar de la lista de forma consistente
 */
export const getDefaultAvatar = (userId?: string | number): string => {
  if (!userId) return avatar1;
  
  // Convertir ID a número si es string
  const idNum = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  
  // Usar el ID para seleccionar un avatar de forma consistente
  const avatarIndex = Math.abs(idNum) % defaultAvatars.length;
  return defaultAvatars[avatarIndex];
};

/**
 * Componente UserAvatar - Muestra el avatar de un usuario
 * Usa imagen personalizada si se proporciona, o avatar por defecto basado en el ID
 */
export const UserAvatar = ({
  customImage,
  userId,
  size = 'medium',
  alt = 'Avatar de usuario',
  className = '',
}: UserAvatarProps) => {
  // Determinar qué imagen mostrar
  const avatarSrc = customImage || getDefaultAvatar(userId);

  // Determinar tamaño
  const sizeClass = `avatar-${size}`;

  return (
    <div className={`user-avatar-container ${sizeClass} ${className}`}>
      <img
        src={avatarSrc}
        alt={alt}
        className="user-avatar-image"
        title={alt}
      />
    </div>
  );
};

export default UserAvatar;
