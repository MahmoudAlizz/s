import {
  ScrollArea,
  TextInput,
  Center,
  Image,
  useDirection,
  Flex,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mantine/hooks";
import { data } from "../../data/new-data";
import CategoryItem from "./category-item";
import { useRef, useState } from "react";
import i18n from "../../i18n";
interface Props {
  setCategorySelected: (string: string) => void;
  CategorySelected: string;
}
function Sidebar({ CategorySelected, setCategorySelected }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [, setHovered] = useState(-1);

  const filtered = data.cats.filter(
    (item) =>
      item.EnCategory.toLowerCase().includes(query.toLowerCase()) ||
      item.ArCategory.toLowerCase().includes(query.toLowerCase())
  );

  const items = filtered.map((item, index) => (
    <CategoryItem
      CategorySelected={CategorySelected}
      setCategorySelected={setCategorySelected}
      key={index}
      title={i18n.language == "en" ? item.EnCategory : item.ArCategory}
      iconPath={item.image}
    />
  ));

  const { t } = useTranslation();
  const xs = useMediaQuery("(min-width: 36rem)");

  return (
    <Flex
      justify="space-between"
      align="center"
      direction="column"
      pt={"md"}
      p={"md"}
      h={"100%"}
    >
      <TextInput
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          setHovered(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setHovered((current) => {
              const nextIndex =
                current + 1 >= filtered.length ? current : current + 1;
              viewportRef.current
                ?.querySelectorAll("[data-list-item]")
                ?.[nextIndex]?.scrollIntoView({ block: "nearest" });
              return nextIndex;
            });
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setHovered((current) => {
              const nextIndex = current - 1 < 0 ? current : current - 1;
              viewportRef.current
                ?.querySelectorAll("[data-list-item]")
                ?.[nextIndex]?.scrollIntoView({ block: "nearest" });
              return nextIndex;
            });
          }
        }}
        placeholder={t("searchCategories")}
      />
      <ScrollArea
        h={"60%"}
        w={xs ? "100%" : "60%"}
        type="auto"
        mt="md"
        viewportRef={viewportRef}
      >
        {items}
      </ScrollArea>
      <Center h={"25%"} w={"100%"}>
        <Image
          src={"assets/icons-2023/thaki-avatar.png"}
          w={{ base: 160, xs: 120, sm: 130, md: 150 }}
          h={"100%"}
        />
      </Center>
    </Flex>
  );
}

export default Sidebar;
