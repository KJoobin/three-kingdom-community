import React, { useEffect, useRef, useState } from "react";

import { BoldText, Box, Container, Text, TextProps } from "@component/atoms";
import {Card, PointerCard} from "@component/atoms/card";
import { InputFieldText } from "@component/molecules";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
// https://developer.mozilla.org/ko/docs/Web/API/AbortController/abort
// TODO: fix build error
// const controller = new AbortController();

export type SkillType = {
  id :number;
  name :string;
  Skill :Skill[];
}

export type Skill = {
  id :number;
  name :string;
  desc :string;
  picture? :string;
  rank :string;
  target :string;
  percentage :number;

  skillTypeId :number;
  Type :SkillType;

  warlord :Warlord[];
  givenWarlord :Warlord[];

  createdAt :string;
}

export type Warlord = {
  id : number;
  name :string;
  picture? :string;
  rank :string;

  skillId :number;
  skill :Skill;

  givenSkillId :number;
  givenSkill :Skill;

  createdAt :string;
}

type Result = Warlord;

export default function SearchWarlords() {
  const route = useRouter();

  const timeoutId = useRef<any>();

  const [temp, setTemp] = useState<string>("");
  const [result, setResult] = useState<Result[]>([]);
  const [error, setError] = useState<string>();

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
          setError("");
          setResult(res.data);
        }).catch((error) => {
          setError(error.message);
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
        {error
          ? <Box>
            <Text variant={"body1"}>{error}</Text>
          </Box>
          : result.length > 0
            ? result.map((el, idx) => {
              return (
                <Link href={`/warlord/${el.name}`}>
                  <Box mb={3}>
                    <PointerCard key={idx} style={{ cursor: "pointer" }}>
                      <Box p={2} bgcolor={"white"}>
                        <BoldText variant={"h5"}>
                          장수 이름: {el.name}
                        </BoldText>
                        <BoldText variant={"body1"}>
                          등급: {el.rank}
                        </BoldText>
                        <BoldText variant={"body1"}>
                          스킬 이름: {el.skill.name}
                        </BoldText>
                        <BoldText variant={"body1"}>
                          전법 전승 스킬 이름: {el.givenSkill.name}
                        </BoldText>
                      </Box>
                    </PointerCard>
                  </Box>
                </Link>
              );
            })
            : (<Text variant={"subtitle1"}>NO RESULT</Text>)
        }
      </Box>
    </Container>
  );
}
