/*
 * @Date: 2024-09-10 17:17:39
 * @Description: description
 */
import { CommonComponentProps } from "../../interface";

const Prod = ({ children, styles }: CommonComponentProps) => {

    return (
        <div
            className='p-[20px]'
            style={{ ...styles }}
        >
            {children}
        </div>
    )
}

export default Prod;
