/*
 * @Date: 2024-08-20 15:47:35
 * @Description: description
 */
import { useEffect } from "react";
import { useComponentsStore } from "../stores/components";

export function EditArea() {
  const { components, addComponent, deleteComponent, updateComponentProps } = useComponentsStore();
  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: "Container",
        props: {},
        children: [],
      },
      1
    );

    addComponent(
      {
        id: 333,
        name: "Video",
        props: {},
        children: [],
      },
      222
    );

    setTimeout(() => {
      deleteComponent(333);
    }, 3000);

    updateComponentProps(222, {
      window: 'OS',
      title: 'Hello World',
      
    });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}
