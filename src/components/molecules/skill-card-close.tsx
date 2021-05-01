import React, { forwardRef } from "react";

import { BoldText, Box, PointerCard } from "@component/atoms";
import { Skill, Warlord } from "@pages/search/skill";

type SkillCardCloseProps = {
  skill : Skill;
  onClick?: () => void;
  ref?:any;
}

export const SkillCardClose:React.FunctionComponent<SkillCardCloseProps> = forwardRef(({
  skill,
  onClick,
}, ref) => {
  return (
    <Box onClick={onClick} ref={ref}>
      <BoldText variant={"body1"}>
              스킬 이름: {skill.name}
      </BoldText>
      <BoldText variant={"subtitle1"}>
              스킬 설명: {skill.desc}
      </BoldText>
    </Box>
  );
});
