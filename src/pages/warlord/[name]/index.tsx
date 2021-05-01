import React, { useEffect, useState } from "react";

import { Box, Card, Container, Image, Spinner, Text } from "@component/atoms";
import { SearchSkillWarlordCard } from "@component/organisms/search-skill-warlord-card";
import { Warlord } from "@pages/search/skill";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function WarlordDetail() {
  const route = useRouter();

  const [result, setResult] = useState<Warlord>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (route.query.name) {
      setLoading(true);
      axios.get(`/api/warlord?name=${route.query.name}`).then((res) => {
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
        <desc>장수의 스킬, 전법스킬 디테일 검색</desc>
      </Head>
      <Container>
        <Box>
          <Text>
          장수
          </Text>
        </Box>
        <Box>
          {loading
            ? <Spinner />
            : error
              ? <Box>
                <Text variant={"body1"}>{error}</Text>
              </Box>
              : result
                ? (
                  <Box mb={3}>
                    <SearchSkillWarlordCard warlord={result} />
                  </Box>
                )
                : (<Text variant={"subtitle1"}>찾으시는 장수가 없습니다.</Text>)
          }
        </Box>
      </Container>
    </>
  );
}
