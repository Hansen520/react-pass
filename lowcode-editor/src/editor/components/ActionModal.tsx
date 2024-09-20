/*
 * @Date: 2024-09-20 09:53:44
 * @Description: description
 */
import React, { useEffect, useState } from "react";
import { Modal, Segmented } from "antd";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";
import { CustomJS, CustomJSConfig } from "./actions/CustomJS";
export type ActionConfig = GoToLinkConfig | ShowMessageConfig | CustomJSConfig;

interface ActionModalProps {
  // TODO: Define props
  visible: boolean;
  action?: ActionConfig; // 当前选中的动作
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}

const map = {
  goToLink: "访问链接",
  showMessage: "消息提示",
  customJS: "自定义 JS",
};

function ActionModal(props: ActionModalProps) {
  const { visible, action, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>("访问链接");
  const [curConfig, setCurConfig] = useState<ActionConfig>();

  /* 通过action变化把key放进去 */
  useEffect(() => {
    if (action?.type) {
      setKey(map[action.type] || "访问链接");
    }
  }, [action]);

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
            value={action?.type === "goToLink" ? action.url : ""}
            onChange={(config) => {
              console.log(config);
              setCurConfig(config);
            }}
          />
        )}
        {key === "消息提示" && (
          <ShowMessage
            value={action?.type === "showMessage" ? action.config : undefined}
            onChange={(config) => {
              console.log(config);
              setCurConfig(config);
            }}
          />
        )}
        {key === "自定义 JS" && (
          <CustomJS
            value={action?.type === "customJS" ? action.code : ""}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}

export { ActionModal };
