import React, { useEffect, useRef, useState } from "react";

import { Box, Container, Text } from "@component/atoms";
import { Spinner } from "@component/atoms/spinner";
import { InputFieldText } from "@component/molecules";
import { SearchSkillWarlordCard } from "@component/organisms/search-skill-warlord-card";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

// https://developer.mozilla.org/ko/docs/Web/API/AbortController/abort

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

type Result = Warlord | Skill;

export default function SearchWarlords() {
  const route = useRouter();

  const timeoutId = useRef<any>();
  const searchTemp = useRef<string>("");

  const [temp, setTemp] = useState<string>("");
  const [result, setResult] = useState<Result[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTemp(e.target.value);
  };

  useEffect(() => {
    if (temp) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      searchTemp.current = temp;
      timeoutId.current = setTimeout(() => {
        setLoading(true);
        axios.get(`/api/skill?q=${temp}`).then((res) => {
          if (searchTemp.current !== temp) {
            return;
          }
          setError("");
          setResult(res.data);
          setLoading(false);
        }).catch((error) => {
          setError(error.message);
          setLoading(false);
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
    <>
      <Head>
        <title>????????? ????????? ????????? ?????? ??????</title>
        <desc>?????? ??????, ?????? ??????, ?????? ?????? ?????? ??????</desc>
        <meta itemProp="name" content="????????? ????????? ??????, ??????, ???????????? ??????"/>
        <meta itemProp="description" content="?????? ??????, ?????? ??????, ?????? ?????? ?????? ??????"/>
        <script data-ad-client="ca-pub-3235703528769525" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
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
            label={"?????? ?????? ?????? ?????? ??????"}
            InputLabelProps={{ shrink: true }}
            value={temp}
            onChange={onChangeText}/>
        </Box>
        <Box>
          <Box mb={2}>
            <Text variant={"h5"}>RESULT</Text>
          </Box>

          {loading
            ? <Spinner />
            : error
              ? <Box>
                <Text variant={"body1"}>{error}</Text>
              </Box>
              : result.length > 0
                ? result.map((el, idx) => {
                  return (
                    <Box key={idx} mb={3}>
                      {el && <SearchSkillWarlordCard {...("skill" in el ? { warlord: el } : { skill: el })} />}
                    </Box>
                  );
                })
                : (<Text variant={"subtitle1"}>NO RESULT</Text>)
          }
        </Box>
      </Container>
    </>
  );
}
