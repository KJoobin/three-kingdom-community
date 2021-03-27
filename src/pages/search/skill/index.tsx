import React from "react";

import { Box, Container, Text } from "@component/atoms";
import { InputFieldText } from "@component/molecules";
import { useRouter } from "next/router";

export default function SearchWarlords() {
  const route = useRouter();
  console.log({ route });

  return (
    <Container>
      <Box>
        <Text>
        Search Warlords
        </Text>

      </Box>
      <Box p={1}>
        <InputFieldText label={"장수 이름 또는 전법 이름"} required fullWidth/>
      </Box>
    </Container>
  );
}
