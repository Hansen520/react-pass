/*
 * @Date: 2024-09-20 09:53:44
 * @Description: description
 */
import React, { useState } from "react";
import { Modal, Segmented } from "antd";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";

interface ActionModalProps {
  // TODO: Define props
  visible: boolean;
  handleOk: (config?: GoToLinkConfig | ShowMessageConfig) => void
  handleCancel: () => void;
}

function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>("访问链接");
  const [curConfig, setCurConfig] = useState<GoToLinkConfig | ShowMessageConfig>();

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented value={key} onChange={setKey} block options={["访问链接", "消息提示", "自定义 JS"]} />
        {key === "访问链接" && (
          <GoToLink
            onChange={(config) => {
              console.log(config);
              setCurConfig(config);
            }}
          />
        )}
        {key === "消息提示" && (
          <ShowMessage
            onChange={(config) => {
              console.log(config);
              setCurConfig(config);
            }}
          />
        )}
        {key === "自定义 JS" && <div>自定义 JS</div>}
      </div>
    </Modal>
  );
}

export default ActionModal;
