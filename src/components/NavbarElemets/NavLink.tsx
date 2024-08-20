// import { useNavigate } from "react-router-dom";

interface NavLinkProps {
  item: string;
  mobile?: boolean;
  active: string;
  onItemClick: (item: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, mobile, active, onItemClick }) => (
  <li onClick={() => onItemClick(item)}>
    <a
      href="#"
      className={`${mobile
        ? "block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
        : "text-base font-semibold border-b-2 pb-1"
        } transition duration-300 ease-in-out ${active === item
          ? mobile
            ? "text-blue-600 bg-gray-100"
            : "text-blue-600 border-blue-600"
          : "text-gray-700 hover:text-blue-600 border-transparent hover:border-blue-600"
        }`}
    >
      {item}
    </a>
  </li>
);

export default NavLink;