/*
 * @Date: 2024-09-10 17:17:15
 * @Description: description
 */
import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";

const Prod = ({ type, text, styles, ...props }: CommonComponentProps) => {
  return (
    <AntdButton type={type} style={styles} { ...props }>
      {text}
    </AntdButton>
  );
};

export default Prod;
