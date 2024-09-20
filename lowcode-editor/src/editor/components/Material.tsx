/*
 * @Date: 2024-08-20 15:47:28
 * @Description: description
 */
import { useMemo } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import MaterialItem from "./MaterialItem";

export function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter(item => item.name !== "Page");
  }, [componentConfig]);


  return (
    <div>
      {components.map((item, index) => {
        return <MaterialItem desc={item.desc} name={item.name} key={item.name + index} />;
      })}
    </div>
  );
}
