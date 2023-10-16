import { Group, Anchor, Text } from "@mantine/core";
import { useElementSize, useHover, useMergedRef } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { ReactNode, RefObject } from "react";
import ImageComponent from "../image-item";
import i18n from "../../i18n";
interface Props {
  title: string;
  iconPath: string;
  setCategorySelected: (string: string) => void;
  CategorySelected: string;
}

function CategoryItem({
  CategorySelected,
  setCategorySelected,
  iconPath,
  title,
}: Props) {
  const {
    hovered,
    ref,
  }: { hovered: boolean; ref: RefObject<HTMLAnchorElement> } = useHover();

  const anchor = useElementSize();
  const refAnchor = anchor.ref;
  const widthAnchor = anchor.width;

  const mergedRef = useMergedRef(refAnchor, ref);

  return (
    <Group gap={"0px"} pt={"5px"}>
      <ImageComponent imagePath={iconPath} w={"20%"} />
      <Anchor
        w={"75%"}
        pl={i18n.language == "en" ? "xs" : ""}
        pr={i18n.language == "ar" ? "xs" : ""}
        ref={mergedRef}
        c={hovered || CategorySelected === title ? "white" : "gray "}
        onClick={() => {
          setCategorySelected(title);
        }}
        underline="never"
      >
        <Text
          lineClamp={1}
          size={`${(widthAnchor * 9) / 100}px`}
          py={`${(widthAnchor * 3) / 100}px`}
        >
          {title}
        </Text>
      </Anchor>
    </Group>
  );
}

export default CategoryItem;
