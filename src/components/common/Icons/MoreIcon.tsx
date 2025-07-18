


const MoreIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <path d="M12 5.25a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8.25a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8.25a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
  </svg>
);

export default MoreIcon;