import React from 'react';
import { usePathname } from 'next/navigation';


interface IconProps {
  width?: number;
  height?: number;
}

const ProfICO: React.FC<IconProps> = ({ width = 20, height = 20}) => {
    const pathname = usePathname();
    const fill = pathname === '/' ? 'white' : 'black';
        return(
            <svg
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M10 10.8333C12.3012 10.8333 14.1667 8.96785 14.1667 6.66667C14.1667 4.36548 12.3012 2.5 10 2.5C7.69882 2.5 5.83334 4.36548 5.83334 6.66667C5.83334 8.96785 7.69882 10.8333 10 10.8333Z" stroke={fill} strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M16.6667 17.5C16.6667 15.7319 15.9643 14.0362 14.7141 12.786C13.4638 11.5358 11.7681 10.8334 10 10.8334C8.2319 10.8334 6.53621 11.5358 5.28596 12.786C4.03572 14.0362 3.33334 15.7319 3.33334 17.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
};

export default ProfICO;

