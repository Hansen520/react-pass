/*
 * @Date: 2024-09-10 17:17:09
 * @Description: description
 */
import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";

const Dev = ({ id, type, text, styles }: CommonComponentProps) => {

  const [, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
      dragType: 'move',
      id: id
    }
  })

  return (
    <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Dev;
