/*
 * @Date: 2024-09-10 17:17:09
 * @Description: description
 */
import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";

const Dev = ({ id, type, text, styles }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Dev;
