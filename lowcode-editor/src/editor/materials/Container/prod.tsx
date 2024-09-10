/*
 * @Date: 2024-08-20 16:48:25
 * @Description: Container组件
 */
import { CommonComponentProps } from "../../interface";

const Prod = ({ children, styles }: CommonComponentProps) => {
  return (
    <div style={styles} className="p-[20px]">
      {children}
    </div>
  );
};

export default Prod;
