import React, { forwardRef } from "react";

import { Box, Image, Text } from "@component/atoms";
import { Warlord } from "@pages/search/skill";
import Link from "next/link";

type WarlordCardOpenProps = {
  warlord:Warlord;
  onClick?: () => void;
  ref?:any;
}

export const WarlordCardOpen:React.FunctionComponent<WarlordCardOpenProps> = forwardRef(({
  warlord,
  onClick,
}, ref) => {
  return (
    <Box onClick={onClick} ref={ref}>
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
        <Text variant={"body1"}>
          장수 이름: {warlord.name}
        </Text>
        <Text variant={"body1"}>
          등급: {warlord.rank}
        </Text>
      </Box>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
      <Box p={1}>
        <Box display={"flex"} style={{ justifyContent: "center" }}>
          <Text variant={"h5"}>스킬</Text>
        </Box>
        <Text variant={"body1"}>
          이름: {warlord.skill.name}
        </Text>
        <Text variant={"body1"}>
          타입: {warlord.skill.Type.name}
        </Text>
        <Text variant={"body1"}>
          확률: {warlord.skill.percentage}%
        </Text>
        <Text variant={"body1"}>
          타겟: {warlord.skill.target}
        </Text>
        <Text variant={"body1"}>{warlord.skill.desc}
        </Text>
      </Box>
      <Box width={"100%"} height={2} bgcolor={"divider"}/>
      <Box p={1}>
        <Box display={"flex"} style={{ justifyContent: "center" }}>
          <Text variant={"h5"}>전법 스킬</Text>
        </Box>
        <Text variant={"body1"}>
          이름: {warlord.givenSkill.name}
        </Text>
        <Text variant={"body1"}>
          타입: {warlord.givenSkill.Type.name}
        </Text>
        <Text variant={"body1"}>
          확률: {warlord.givenSkill.percentage}%
        </Text>
        <Text variant={"body1"}>
          타겟: {warlord.givenSkill.target}
        </Text>
        <Text variant={"body1"} style={{ whiteSpace: "pre-line", lineHeight: 2 }}>{warlord.givenSkill.desc}
        </Text>
      </Box>
    </Box>
  );
});
