import React, { useEffect, useRef, useState } from "react";

import { Box, Container, Text } from "@component/atoms";
import { InputFieldText } from "@component/molecules";
import { warlordSkillData } from "@utils/warlord-skill-data";
import axios from "axios";
import { useRouter } from "next/router";

// https://developer.mozilla.org/ko/docs/Web/API/AbortController/abort
// TODO: fix build error
// const controller = new AbortController();

export default function SearchWarlords() {
  const route = useRouter();

  const timeoutId = useRef<any>();

  const [temp, setTemp] = useState<string>("");
  const [result, setResult] = useState<typeof warlordSkillData>();

  const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTemp(e.target.value);
  };

  useEffect(() => {
    if (temp) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        axios.get(`/api/skill?q=${temp}`).then((res) => {
          setResult(res.data);
        });
      }, 300);
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
      <Box>
        <Box mb={2}>
          <Text variant={"h5"}>RESULT</Text>
        </Box>
        {result
          ? result.map((el) => {
            return <Box mb={3}>
              <Text variant={"body1"}>
              등급: {el.rank}
              </Text>
              <Text variant={"body1"}>
              스킬 이름: {el.skillName}
              </Text>
              <Text variant={"body1"}>
              전법 전승 장수: {el.warLords.join(", ")}
              </Text>
              <Text variant={"body1"}>
              스킬 타입: {el.type}
              </Text>
              <Text variant={"body1"}>
              타겟: {el.target}
              </Text>
              <Text variant={"body1"}>
              발동 확률: {el.percentage}
              </Text>
              <Text variant={"body1"}>
              설명: {el.desc}
              </Text>
            </Box>;
          })
          : (<Text variant={"subtitle1"}>NO RESULT</Text>)
        }
      </Box>
    </Container>
  );
}
