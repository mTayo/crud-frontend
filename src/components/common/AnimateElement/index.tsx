
import React from 'react';
import { motion, useCycle } from 'framer-motion';

const AnimateElement = React.forwardRef(({ 
    children, 
    type ='scale', 
    direction='right', 
    offset=10, 
    scale ={
        hover: 1,
        tap: 0.9
    }, 
    className="",
    onClick = () => void 0,
    ...rest
 }: { 
    children: React.ReactNode; 
    type?: 'scale' | 'rotate' | 'slide'; 
    direction?: 'up' | 'down' | 'left' | 'right'; 
    offset?: number; 
    scale?: { hover: number; tap: number } | number; 
    className?: string; 
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}, ref: React.Ref<HTMLDivElement>) => {
    let offset1;
    let offset2;
    switch (direction) {
        case 'up':
        case 'left':
            offset1 = offset;
            offset2 = 0;
            break;
        case 'right':
        case 'down':
        default:
            offset1 = 0;
            offset2 = offset;
            break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
        case 'rotate':
            return (
                <motion.div
                    ref={ref}
                    animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 2,
                    repeatDelay: 0
                }}
                onClick={onClick}
            >
                    {children}
                </motion.div>
            );
        case 'slide':
            if (direction === 'up' || direction === 'down') {
                return (
                    <motion.div ref={ref} animate={{ y }} onHoverEnd={() => cycleY()} onHoverStart={() => cycleY()}  onClick={onClick} {...rest} >
                        {children}
                    </motion.div>
                );
            }
            return (
                <motion.div ref={ref} animate={{ x }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}  onClick={onClick} {...rest}>
                    {children}
                </motion.div>
            );

        case 'scale':
        default:
            if (typeof scale === 'number') {
                scale = {
                    hover: scale,
                    tap: scale
                };
            }
            return (
                <motion.div ref={ref} whileHover={{ scale: scale.hover }} whileTap={{ scale: scale.tap }}  onClick={onClick} className={className} {...rest}>
                    {children}
                </motion.div>
            );
    }
});


export default AnimateElement;