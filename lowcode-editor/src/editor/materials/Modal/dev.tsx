/*
 * @Date: 2024-09-20 16:16:36
 * @Description: description
 */
import { useMaterialDrop } from '../../hooks/useMaterialDrop';
import { CommonComponentProps } from '../../interface';

function Dev({ id, children, title, styles }: CommonComponentProps) {
    const {canDrop, dropRef } = useMaterialDrop(['Button', 'Container'], id);
    console.log('Modal');
    return (
        <div 
            ref={dropRef}
            style={styles}
            data-component-id={id}  
            className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            <h4>{title}</h4>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Dev;
