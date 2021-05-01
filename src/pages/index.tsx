import React from "react";

import { Box, Container, Text } from "@component/atoms";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
        <meta itemProp="name" content="삼국지 전략판"/>
        <meta itemProp="description" content="삼국지 전략판 에 필요한 장수검색, 스킬 검색, 전법 전승 검색 컨텐츠"/>
        <script data-ad-client="ca-pub-3235703528769525" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <meta name="google-site-verification" content="BpKt2jxZjZiGovOmRQWQIWPtaejyVNROK2U0Q7cH2h0" />
      </Head>
      <Container>
        <Box style={{ height: "calc(100vh - 16px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <main>
            <Box>
              <Box py={1}>
                <Text variant={"h5"}>
                  <Link href={"search/skill"}>
                전법 검색
                  </Link>
                </Text>
              </Box>
              <Box py={1}>
                <Text variant={"h5"}>
                  <Link href={"warlord/season/2"}>
                    시즌 2 장수 모두 보기
                  </Link>
                </Text>
              </Box>
              <Box py={1}>
                <Text variant={"h5"}>
                  <Link href={"https://welfare.qookkagames.co.kr/barter#/"}>
                    쿠폰 입력
                  </Link>
                </Text>
              </Box>

              {/* only development*/}
              {process.env.NODE_ENV === "development"
              && <Box py={1}>
                <Text variant={"h5"}>
                  <Link href={"put/data"}>
                    데이터 추가, 수정
                  </Link>
                </Text>
              </Box>}
            </Box>
          </main>
        </Box>
      </Container>
    </>
  );
}
