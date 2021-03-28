import { Box, Container, Image, Text } from "@component/atoms";
import Link from "next/link";

export default function Home() {
  return (
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
          마지막 업데이트 : 2021년 3월 28일
            </Text>
          </Box>
        </footer>
      </Box>
    </Container>
  );
}
