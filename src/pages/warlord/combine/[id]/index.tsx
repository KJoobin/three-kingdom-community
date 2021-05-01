import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Image, Spinner,
  Text,
} from "@component/atoms";
import { ModalWarlordSkillSearch } from "@component/organisms";
import { Warlord } from "@pages/search/skill";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

export default function WarlordCombine() {
  const route = useRouter();
  // 1st captain, 2st vice-captain, 3st member;
  const [existWarlord, setExistWarlord] = useState<Warlord[] | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(()=> {
    setOpen(true);
  }, []);

  useEffect(() => {
    const { id } = route.query;
    if (id) {
      setLoading(true);
      axios.get(`/api/combine/${id}`)
        .then((res) => {
          setExistWarlord(res.data.Warlord);
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [route]);

  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
        <meta itemProp="name" content="삼국지 전략판 장수 조합 하기"/>
        <meta itemProp="description" content="장수를 조합하여 공유 합시다."/>
        <desc>장수, 스킬 조합하기</desc>
      </Head>
      <Container>
        {loading && <Spinner />}
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
    </>
  );
}
