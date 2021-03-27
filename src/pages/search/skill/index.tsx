import React, { useEffect, useState } from "react";

import { Box, Container, Text } from "@component/atoms";
import { InputFieldText } from "@component/molecules";
import axios from "axios";
import { useRouter } from "next/router";

export default function SearchWarlords() {
  const route = useRouter();

  console.log({ route });

  const [temp, setTemp] = useState<string>("");

  const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTemp(e.target.value);
  };

  useEffect(() => {
    if (temp) {
      axios.get(`/api/skill?q=${temp}`).then((res) => {
        console.log(res);
      });
    }
  }, [temp]);

  useEffect(() => {
    const { q } = route.query;
    if (q && typeof q === "string" ) {
      setTemp(q);
    }
  }, [route.query.q]);

  return (
    <Container>
      <Box>
        <Text>
        Search Warlords
        </Text>

      </Box>
      <Box p={1}>
        <InputFieldText
          required
          fullWidth
          label={"장수 이름 또는 전법 이름"}
          InputLabelProps={{ shrink: true }}
          value={temp}
          onChange={onChangeText}
        />
      </Box>
    </Container>
  );
}
