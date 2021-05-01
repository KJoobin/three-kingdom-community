import React, { forwardRef, useCallback, useState } from "react";

import { Box, Button, Image, Text } from "@component/atoms";
import { InputFieldText } from "@component/molecules/input-field-text";
import { Skill } from "@pages/search/skill";
import axios from "axios";
import Link from "next/link";

type SkillCardOpenFixProps = {
  skill: Skill;
  onClick?: () => void;
  ref?: any;
  fixable?: boolean;
}

export const SkillCardOpenFix:React.FunctionComponent<SkillCardOpenFixProps> = forwardRef(({
  skill,
  onClick,
  fixable,
}, ref) => {

  const [value, setValue] = useState<Skill>({
    ...skill,
  });

  const onModify = useCallback(() => {
    axios.put("/api/skill", {
      ...value,
    });
  }, [value]);
  return (
    <Box ref={ref}>
      <Box p={1}>
        <InputFieldText multiline fullWidth value={value.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, name: value }))}/>
        <InputFieldText multiline fullWidth value={value.Type.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, Type: { ...prev.Type, name: value }}))}/>
        <InputFieldText multiline fullWidth value={value.percentage} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, percentage: Number(value) }))}/>
        <InputFieldText multiline fullWidth value={value.target} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, target: value }))}/>
        <InputFieldText multiline fullWidth value={value.desc} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, desc: value }))}/>
      </Box>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
      <Button onClick={onModify} variant={"contained"} >수정</Button>
    </Box>
  );
});
