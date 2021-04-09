import React, { forwardRef } from "react";

import { BoldText, Box, PointerCard } from "@component/atoms";
import { Warlord } from "@pages/search/skill";

type WarlordCardCloseProps = {
  warlord:Warlord;
  onClick?: () => void;
  ref?:any;
}

export const WarlordCardClose:React.FunctionComponent<WarlordCardCloseProps> = forwardRef(({
  warlord,
  onClick,
}, ref) => {
  return (
    <Box onClick={onClick} ref={ref}>
      <BoldText variant={"h5"}>
              장수 이름: {warlord.name}
      </BoldText>
      <BoldText variant={"body1"}>
              등급: {warlord.rank}
      </BoldText>
      <BoldText variant={"body1"}>
              스킬 이름: {warlord.skill.name}
      </BoldText>
      <BoldText variant={"body1"}>
              전법 전승 스킬 이름: {warlord.givenSkill.name}
      </BoldText>
    </Box>
  );
});
