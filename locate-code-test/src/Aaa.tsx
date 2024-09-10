/*
 * @Date: 2024-08-30 14:04:19
 * @Description: description
 */
import React, { useState } from 'react';
import { Slider, Switch } from 'antd';
import Bbb from './Bbb';

const Aaa: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };

  return (
    <>
        <div>
            <Slider defaultValue={30} disabled={disabled} />
            <Slider range defaultValue={[20, 50]} disabled={disabled} />
            Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
        </div> 
        <Bbb></Bbb>
    </>
  );
};

export default Aaa;