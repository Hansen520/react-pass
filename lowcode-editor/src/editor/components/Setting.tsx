/*
 * @Date: 2024-08-20 15:47:42
 * @Description: description
 */
import React from "react";
import { useComponentsStore } from "../stores/components";

export function Setting() {
  const { components } = useComponentsStore();
  return (
    <div>
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}
