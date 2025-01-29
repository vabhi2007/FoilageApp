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
      className={`text-tertiary text-[1vw] hover:text-primary hover:font-bold ${className}`}
    >
      {text}
    </Link>
  );
};

export default Navlink;