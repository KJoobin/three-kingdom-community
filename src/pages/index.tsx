import { Box, Container, Image } from "@component/atoms";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <Container>
          <Box>
            <Image src={"./images/main-image.png"} width={"auto"} height={"auto"}/>
          </Box>
          <Box py={1}>
            <Link href={"search/skill"}>
              전법 검색
            </Link>
          </Box>
        </Container>
      </main>
    </div>
  );
}
