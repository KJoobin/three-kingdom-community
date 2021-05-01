import React, { forwardRef, useCallback, useState } from "react";

import { Box, Button, Image, Text } from "@component/atoms";
import { InputFieldText } from "@component/molecules/input-field-text";
import { Warlord } from "@pages/search/skill";
import axios from "axios";
import Link from "next/link";

type WarlordCardOpenFixProps = {
  warlord:Warlord;
  onClick?: () => void;
  ref?:any;
  fixable?:boolean;
}

export const WarlordCardOpenFix:React.FunctionComponent<WarlordCardOpenFixProps> = forwardRef(({
  warlord,
  onClick,
  fixable,
}, ref) => {

  const [value, setValue] = useState<Warlord>({
    ...warlord,
  });

  const onModify = useCallback(() => {
    axios.put("/api/skill", {
      ...value,
    });
  }, [value]);
  return (
    <Box ref={ref}>
      {warlord.picture
        ? (
          <Box display={"flex"} width={"100%"} justifyContent={"center"}>
            <Box width={180}>
              <Image src={warlord.picture} aspectRatio={11 / 16}/>
            </Box>
          </Box>
        )
        : <Link href={`/warlord/${warlord.name}/upload`} >사진 등록하기</Link>}
      <Box p={1}>
        <InputFieldText multiline fullWidth value={value.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, name: value }))}/>
        <InputFieldText multiline fullWidth value={value.rank} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, rank: value }))}/>
      </Box>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
      <Box p={1}>
        <InputFieldText multiline fullWidth value={value.skill.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, skill: { ...prev.skill, name: value }}))}/>
        <InputFieldText multiline fullWidth value={value.skill.Type.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, skill: { ...prev.skill, Type: { ...prev.skill.Type, name: value }}}))}/>
        <InputFieldText multiline fullWidth value={value.skill.percentage} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, skill: { ...prev.skill, percentage: Number(value) }}))}/>
        <InputFieldText multiline fullWidth value={value.skill.target} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, skill: { ...prev.skill, target: value }}))}/>
        <InputFieldText multiline fullWidth value={value.skill.desc} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, skill: { ...prev.skill, desc: value }}))}/>
      </Box>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
      <Box p={1}>
        <InputFieldText multiline fullWidth value={value.givenSkill.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, givenSkill: { ...prev.givenSkill, name: value }}))}/>
        <InputFieldText multiline fullWidth value={value.givenSkill.Type.name} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, givenSkill: { ...prev.givenSkill, Type: { ...prev.givenSkill.Type, name: value }}}))}/>
        <InputFieldText multiline fullWidth value={value.givenSkill.percentage} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, givenSkill: { ...prev.givenSkill, percentage: Number(value) }}))}/>
        <InputFieldText multiline fullWidth value={value.givenSkill.target} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, givenSkill: { ...prev.givenSkill, target: value }}))}/>
        <InputFieldText multiline fullWidth value={value.givenSkill.desc} onChange={({ target: { value }}) => setValue(prev => ({ ...prev, givenSkill: { ...prev.givenSkill, desc: value }}))}/>
      </Box>
      <Button onClick={onModify} variant={"contained"} >수정</Button>
    </Box>
  );
});
