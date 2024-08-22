/*
 * @Date: 2024-08-20 16:50:35
 * @Description: button组件
 */
import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";


const Button = ({ id, type, text }: CommonComponentProps) => {
  return <AntdButton data-component-id={id} type={type}>{text}</AntdButton>;
};

export default Button;
