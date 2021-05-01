import React, { useEffect, useRef, useState } from "react";

import { Box, PointerCard } from "@component/atoms";
import { SkillCardClose } from "@component/molecules/skill-card-close";
import { SkillCardOpen } from "@component/molecules/skill-card-open";
import { SkillCardOpenFix } from "@component/molecules/skill-card-open-fix";
import { WarlordCardClose } from "@component/molecules/warlord-card-close";
import { WarlordCardOpen } from "@component/molecules/warlord-card-open";
import { WarlordCardOpenFix } from "@component/molecules/warlord-card-open-fix";
import { Skill, Warlord } from "@pages/search/skill";

const ANIMATION_DURATION = 1;

export type SearchSkillWarlordCardProps = {
  warlord?: Warlord;
  skill?: Skill;
  fixable?:boolean;
}

export const SearchSkillWarlordCard:React.FunctionComponent<SearchSkillWarlordCardProps> = ({
  warlord,
  skill,
  fixable,
}) => {
  const [expand, setExpand] = useState(false);
  const [renderOpen, setRenderOpen] = useState(false);
  const timeoutId = useRef<any>();

  const onAnimationEnd = () => {
    const isCollapse = !expand;
    if (isCollapse) {
      setRenderOpen(false);
    }
  };

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (expand) {
      setRenderOpen(true);
    } else {
      timeoutId.current = setTimeout(onAnimationEnd, ANIMATION_DURATION * 1000);
    }
  }, [expand]);

  return (
    <PointerCard style={{ backgroundColor: "white" }}>
      <Box style={{ padding: 8, transition: `max-height ${ANIMATION_DURATION}s ease-in-out`, maxHeight: expand ? 1000 : 150 }} bgcolor={"white"}>
        {warlord && (
          renderOpen
            ? (fixable ? <WarlordCardOpenFix warlord={warlord} onClick={() => setExpand(prev => !prev)} /> : <WarlordCardOpen warlord={warlord} onClick={() => setExpand(prev => !prev)} />)
            : <WarlordCardClose warlord={warlord} onClick={() => setExpand(prev => !prev)} />)
        }
        {skill && (
          renderOpen
            ? (fixable ? <SkillCardOpenFix skill={skill} onClick={() => setExpand(prev => !prev)} /> : <SkillCardOpen skill={skill} onClick={() => setExpand(prev => !prev)} />)
            : <SkillCardClose skill={skill} onClick={() => setExpand(prev => !prev)} />)
        }

      </Box>
    </PointerCard>
  );
};
