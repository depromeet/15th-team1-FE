import { css } from "@emotion/react";
import { useContext } from "react";

import { RadioContext } from "./RadioButtonGroup";

import ListItemCard from "@/component/common/Card/ListItemCard";

type RadioProps = {
  value: string;
  children: React.ReactNode;
};

export function Radio({ value, children }: RadioProps) {
  const radioContext = useContext(RadioContext);
  return (
    <ListItemCard variant={radioContext?.isChecked(value) ? "theme" : "default"}>
      <label
        htmlFor={value}
        css={css`
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          cursor: pointer;
        `}
      >
        {children}
      </label>
      <input
        type="radio"
        name={radioContext?.radioName}
        id={value}
        value={value}
        onChange={(e) => {
          radioContext?.onChange && radioContext.onChange(e.target.value);
        }}
        css={css`
          display: none;
        `}
      />
    </ListItemCard>
  );
}

export default Radio;
