import React from 'react';
import { usePathname } from 'next/navigation';


interface IconProps {
  width?: number;
  height?: number;
}

const ShopICO: React.FC<IconProps> = ({ width = 20, height = 20}) => {
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
               <path d="M6.66668 18.3333C7.12691 18.3333 7.50001 17.9602 7.50001 17.5C7.50001 17.0397 7.12691 16.6666 6.66668 16.6666C6.20644 16.6666 5.83334 17.0397 5.83334 17.5C5.83334 17.9602 6.20644 18.3333 6.66668 18.3333Z" stroke={fill} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8333 18.3333C16.2936 18.3333 16.6667 17.9602 16.6667 17.5C16.6667 17.0397 16.2936 16.6666 15.8333 16.6666C15.3731 16.6666 15 17.0397 15 17.5C15 17.9602 15.3731 18.3333 15.8333 18.3333Z" stroke={fill} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1.70834 1.70837H3.37501L5.59168 12.0584C5.67299 12.4374 5.8839 12.7763 6.1881 13.0166C6.4923 13.2569 6.87077 13.3837 7.25834 13.375H15.4083C15.7877 13.3744 16.1554 13.2444 16.4509 13.0066C16.7463 12.7687 16.9518 12.4371 17.0333 12.0667L18.4083 5.87504H4.26668" stroke={fill} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
};

export default ShopICO;
