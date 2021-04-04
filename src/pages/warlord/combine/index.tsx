import React, { useCallback, useState } from "react";

import {
  Box,
  Button,
  Container,
  Image,
  Text } from "@component/atoms";
import { ModalWarlordSkillSearch } from "@component/organisms";
import { Warlord } from "@pages/search/skill";
import Head from "next/head";

export default function WarlordCombine() {
  // 1st captain, 2st vice-captain, 3st member;
  const [existWarlord, setExistWarlord] = useState<Warlord[] | null>();
  const [open, setOpen] = useState<boolean>(false);

  const onClick = useCallback(()=> {
    setOpen(true);
  }, []);

  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
        <meta itemProp="name" content="삼국지 전략판 장수 조합 하기"/>
        <meta itemProp="description" content="장수를 조합하여 공유 합시다."/>
        <desc>장수, 스킬 조합하기</desc>
      </Head>
      <Container>
        <Box>
          <Text variant={"h5"}>
            보유중인 장수를 넣어주세요
          </Text>
          <Button onClick={onClick} variant={"contained"}>장수 추가 / 수정</Button>
        </Box>
        <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {existWarlord && existWarlord.map((warlord) => {
            return (
              <Box key={warlord.id} style={{ width: "calc(50% - 24px)", maxWidth: "160px", padding: 8 }}>
                <Image src={warlord.picture || ""} alt={warlord.name} imageStyle={{ white: "100%", height: "100%" }} />
              </Box>
            );
          })}
        </Box>
      </Container>
      <ModalWarlordSkillSearch open={open} onClose={() => setOpen(false)} onToggle={setExistWarlord}/>
    </>
  );
}
