import React, { useEffect, useRef, useState } from "react";

import { Box, PointerCard } from "@component/atoms";
import { WarlordCardClose } from "@component/molecules/warlord-card-close";
import { WarlordCardOpen } from "@component/molecules/warlord-card-open";
import { Warlord } from "@pages/search/skill";

const ANIMATION_DURATION = 1;

export type WarlordCardProps = {
  warlord: Warlord;
}

export const WarlordCard:React.FunctionComponent<WarlordCardProps> = ({
  warlord,
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
        {renderOpen
          ? <WarlordCardOpen warlord={warlord} onClick={() => setExpand(prev => !prev)} />
          : <WarlordCardClose warlord={warlord} onClick={() => setExpand(prev => !prev)} />
        }
      </Box>
    </PointerCard>
  );
};
