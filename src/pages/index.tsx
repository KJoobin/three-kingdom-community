import { Box, Container, Image, Text } from "@component/atoms";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>

      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <main>
        <Container>
          <Box>
            <Image src={"./images/main-image.png"} width={"auto"} height={"auto"}/>
          </Box>
        </Container>
      </main>

      
    </div>
  );
}
