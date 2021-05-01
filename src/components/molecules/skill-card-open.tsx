import React, { forwardRef } from "react";

import { Box, Image, Text } from "@component/atoms";
import { Skill, Warlord } from "@pages/search/skill";
import Link from "next/link";

type SkillCardOpenProps = {
  skill: Skill;
  onClick?: () => void;
  ref?:any;
}

export const SkillCardOpen:React.FunctionComponent<SkillCardOpenProps> = forwardRef(({
  skill,
  onClick,
}, ref) => {
  return (
    <Box onClick={onClick} ref={ref}>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
      <Box p={1}>
        <Box display={"flex"} style={{ justifyContent: "center" }}>
          <Text variant={"h5"}>스킬</Text>
        </Box>
        <Text variant={"body1"}>
          이름: {skill.name}
        </Text>
        <Text variant={"body1"}>
          타입: {skill.Type.name}
        </Text>
        <Text variant={"body1"}>
          확률: {skill.percentage}%
        </Text>
        <Text variant={"body1"}>
          타겟: {skill.target}
        </Text>
        <Text variant={"body1"} style={{ whiteSpace: "pre-line", lineHeight: 2 }}>{skill.desc}
        </Text>
      </Box>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
    </Box>
  );
});
