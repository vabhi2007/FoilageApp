import Link from 'next/link';

type NavlinkProps = {
  text: string;
  link: string;
  className?: string;
};

const Navlink: React.FC<NavlinkProps> = ({text, link, className = ''}) => {
  return (
    <Link
      href = {link}
      className={`text-[#616161] text-[18px] hover:text-[#256963] hover:font-bold ${className}`}
    >
      {text}
    </Link>
  );
};

export default Navlink;