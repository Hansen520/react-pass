/*
 * @Date: 2024-09-23 14:36:06
 * @Description: description
 */
import { Table as AntdTable } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import { CommonComponentProps } from '../../interface';
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useDrag } from 'react-dnd';

function Table({ id, name, children, styles }: CommonComponentProps) {

    const {canDrop, dropRef } = useMaterialDrop(['TableColumn'], id);
    
    const divRef = useRef<HTMLDivElement>(null);

    const [, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id
        }
    });

    useEffect(() => {
      dropRef(divRef);
      drag(divRef);
    }, []);
    


    /* 这个应该是拖入到他里面的值进行修改 */
    const columns = useMemo(() => {
        // React.Children 这个是对数据的平铺
        return React.Children.map(children, (item: any) => {
            return {
                title: <div className='m-[-16px] p-[16px]' data-component-id={item.props?.id}>{item.props?.title}</div>,
                dataIndex: item.props?.dataIndex,
                key: item
            }
        })
    }, [children]);

    return (
        <div
            className={`w-[100%] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
            ref={divRef}
            data-component-id={id}
            style={styles}
        >
            <AntdTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </div>
    );
}

export default Table;
