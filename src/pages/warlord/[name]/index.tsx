import React, { useEffect, useState } from "react";

import { Box, Container, Text } from "@component/atoms";
import { PointerCard } from "@component/atoms/card";
import { Warlord } from "@pages/search/skill";
import axios from "axios";
import { useRouter } from "next/router";

export default function WarlordDetail() {
  const route = useRouter();

  const [picture, setPicture] = useState();
  const [result, setResult] = useState<Warlord>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (route.query.name) {
      axios.get(`/api/warlord?name=${route.query.name}`).then((res) => {
        setError("");
        setResult(res.data);
      }).catch((error) => {
        setError(error.message);
      });
    }
  }, [route]);

  return (
    <Container>
      <Box>
        <Text>
          장수
        </Text>

      </Box>
      <Box>
        {error
          ? <Box>
            <Text variant={"body1"}>{error}</Text>
          </Box>
          : result
            ? (
              <Box mb={3}>
                <PointerCard style={{ cursor: "pointer" }}>
                  <Box p={2} bgcolor={"white"}>
                    <Box p={1}>
                      <Text variant={"body1"}>
                  장수 이름: {result.name}
                      </Text>
                      <Text variant={"body1"}>
                  등급: {result.rank}
                      </Text>
                    </Box>
                    <Box width={"100%"} height={2} bgcolor={"divider"}/>
                    <Box p={1}>
                      <Box display={"flex"} style={{ justifyContent: "center" }}>
                        <Text variant={"h5"}>스킬</Text>
                      </Box>
                      <Text variant={"body1"}>
                        이름: {result.skill.name}
                      </Text>
                      <Text variant={"body1"}>
                      타입: {result.skill.Type.name}
                      </Text>
                      <Text variant={"body1"}>
                      확률: {result.skill.percentage}%
                      </Text>
                      <Text variant={"body1"}>
                      타겟: {result.skill.target}
                      </Text>
                      <Text variant={"body1"}>{result.skill.desc}
                      </Text>
                    </Box>
                    <Box width={"100%"} height={2} bgcolor={"divider"}/>
                    <Box p={1}>
                      <Box display={"flex"} style={{ justifyContent: "center" }}>
                        <Text variant={"h5"}>전법 스킬</Text>
                      </Box>
                      <Text variant={"body1"}>
                        이름: {result.givenSkill.name}
                      </Text>
                      <Text variant={"body1"}>
                         타입: {result.givenSkill.Type.name}
                      </Text>
                      <Text variant={"body1"}>
                         확률: {result.givenSkill.percentage}%
                      </Text>
                      <Text variant={"body1"}>
                         타겟: {result.givenSkill.target}
                      </Text>
                      <Text variant={"body1"}>{result.givenSkill.desc}
                      </Text>
                    </Box>
                  </Box>
                </PointerCard>
              </Box>
            )
            : (<Text variant={"subtitle1"}>찾으시는 장수가 없습니다.</Text>)
        }
      </Box>
    </Container>
  );
}
