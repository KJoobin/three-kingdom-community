import { Box, Container, Image, Text } from "@component/atoms";
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
        <Box height={"calc(100vh - 16px)"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
          <main>
            <Box>
              <Box maxWidth={"100vw"}>
                <Image src={"./images/main-image.png"} width={"100%"} height={"100%"}/>
              </Box>
              <Box py={1}>
                <Text variant={"h5"}>
                  <Link href={"search/skill"}>
                전법 검색
                  </Link>
                </Text>
              </Box>
            </Box>
          </main>
          <footer>
            <Box p={1}>
              <Text>
          마지막 업데이트 : 2021년 4월 2일 16:49
              </Text>
            </Box>
          </footer>
        </Box>
      </Container>
    </>
  );
}
