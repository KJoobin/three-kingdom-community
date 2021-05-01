import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Card, Image, Spinner } from "@component/atoms";
import { InputFieldText, Modal, ModalProps } from "@component/molecules";
import { Warlord } from "@pages/search/skill";
import axios from "axios";

export type ModalWarlordSkillSearchProps = Omit<ModalProps, "children"> & {
  onToggle : (e:Warlord[]) => void;
}

export const ModalWarlordSkillSearch:React.FunctionComponent<ModalWarlordSkillSearchProps> = ({
  onToggle,
  ...props }) => {
  const timeoutId = useRef<NodeJS.Timeout>();

  const [value, setValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [allWarlords, setAllWarlords] = useState<Warlord[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    const current = e.target.value;
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setFilterValue(current), 300);
    setValue(current);
  };

  const onClick = (warlord:Warlord) => () => {
    const index = selected.indexOf(warlord.id);
    if (index < 0) {
      setSelected([...selected, warlord.id]);
      return ;
    } else {
      const newSelected = selected.slice();
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };

  const onSelectAllSLank = () => {
    if (allWarlords) {
      const unExistSLank:number[] = [];
      allWarlords.forEach((warlord) => {
        if (warlord.rank === "S" && !selected.includes(warlord.id)) {
          unExistSLank.push(warlord.id);
        }
      });
      setSelected(prev => [...prev, ...unExistSLank]);
    }
  };

  const onSelectAllALank = () => {
    if (allWarlords) {
      const unExistSLank:number[] = [];
      allWarlords.forEach((warlord) => {
        if (warlord.rank === "A" && !selected.includes(warlord.id)) {
          unExistSLank.push(warlord.id);
        }
      });
      setSelected(prev => [...prev, ...unExistSLank]);
    }
  };

  const onCancelAll = () => {
    setSelected([]);
  };

  useEffect(() => {
    if (allWarlords) {
      onToggle(allWarlords?.filter(warlord => selected.includes(warlord.id)));
    }
  }, [selected]);

  useEffect(() => {
    if (!allWarlords) {
      setLoading(true);
      axios.get("/api/warlord?all=true").then((res) => {
        setAllWarlords(res.data);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <Modal style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} {...props} >
      <Card style={{ minWidth: 360, width: "70%", height: "70%", padding: "24px 8px 0px" }}>
        <InputFieldText
          fullWidth
          label={"장수 이름 또는 전법 이름"}
          InputLabelProps={{ shrink: true }}
          value={value}
          onChange={onChange}/>
        {loading && <Spinner/>}
        <Box style={{ padding: 8 }}>
          <Button variant={"contained"} style={{ marginRight: 8 }} onClick={onSelectAllSLank}>5성 전부 선택</Button>
          <Button variant={"contained"} style={{ marginRight: 8 }}onClick={onSelectAllALank}>4성 전부 선택</Button>
          <Button variant={"contained"} color={"secondary"} onClick={onCancelAll}>전부 취소</Button>
        </Box>
        <Box style={{ display: "flex", overflow: "scroll", flexWrap: "wrap", width: "100%", height: "calc(100% - 120px)", justifyContent: "space-around" }}>
          {allWarlords && allWarlords.filter(warlord => (
            warlord.name.includes(filterValue) || warlord.skill.name.includes(filterValue) || warlord.givenSkill.name.includes(filterValue)
          )).map((warlord) => {
            const hasSelected = selected.includes(warlord.id);
            return (
              <Box
                key={warlord.id}
                style={{ width: "calc(50% - 12px)", maxWidth: "150px", padding: 3, margin: 4, border: `2px solid ${hasSelected ? "green" : "white"}`, backgroundColor: hasSelected ? "green" : "white" }}
                onClick={onClick(warlord)}>
                <Image src={warlord.picture || ""} alt={warlord.name} imageStyle={{ width: "100%", height: "100%" }} />
              </Box>);
          })}
        </Box>
      </Card>
    </Modal>
  );
};
