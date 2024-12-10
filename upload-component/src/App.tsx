/*
 * @Date: 2024-11-21 10:45:02
 * @Description: description
 */
import React from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
// import { Button, message, Upload } from 'antd';

import { Button } from 'antd';
import { Upload, UploadProps } from './Upload';

const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:3333/upload',
  beforeUpload(file) {
    if (file.name.includes('1.image')) {
      console.log('我拒绝了你');
      return false;
    }
    return true;
  },
  onSuccess(ret) {
    console.log('onSuccess', ret);
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress(percentage, file) {
    console.log('onProgress', percentage);
  },
  onChange(file) {
    console.log('onChange', file);
  }
  // headers: {},
  // onChange(info) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
};

const App: React.FC = () => (
  <Upload {...props} drag>
    {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
    <p>
      <InboxOutlined style={{ fontSize: '50px' }} />
    </p>
  </Upload>
);

export default App;
