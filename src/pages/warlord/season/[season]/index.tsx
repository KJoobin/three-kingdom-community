import React, { useEffect, useState } from "react";

import { Box, Card, Container, Image, Spinner, Text } from "@component/atoms";
import { Warlord } from "@pages/search/skill";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function WarlordDetail() {
  const route = useRouter();

  const [result, setResult] = useState<Warlord[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (route.query.season) {
      setLoading(true);
      axios.get(`/api/warlord?season=${route.query.season}`).then((res) => {
        setError("");
        setResult(res.data);
      }).catch((error) => {
        setError(error.message);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [route]);

  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
        <meta itemProp="name" content="삼국지 전략판 장수 디테일"/>
        <meta itemProp="description" content="장수의 스킬, 전법스킬 디테일 검색"/>
        <desc>시즌 장수의 스킬, 전법스킬 디테일 검색</desc>
      </Head>
      <Container>
        <Box>
          {loading
            ? <Spinner />
            : error
              ? <Box>
                <Text variant={"body1"}>{error}</Text>
              </Box>
              : result
                ? (
                  result.map((warlord) => {
                    return (
                      <Box mb={3} width={"100%"}>
                        <Card>
                          <Box p={2} bgcolor={"white"}>
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
                              <Text variant={"body1"}>{warlord.givenSkill.desc}
                              </Text>
                            </Box>
                          </Box>
                        </Card>
                      </Box>
                    );
                  }))
                : (<Text variant={"subtitle1"}>찾으시는 장수가 없습니다.</Text>)
          }
        </Box>
      </Container>
    </>
  );
}
