import {
  BackgroundImage,
  Box,
  Flex,
  AspectRatio,
  Center,
  Text,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { RefObject, useRef } from "react";
import Style from "../../css-modules/global.module.css";
import Info from "./item-info";
// import { OpenApp } from "../../utilities/windows/open_app";
import ImageComponent from "../image-item";
interface Props {
  title: string;
  description: string;
  lang: string[];
  tags: string[];
  info: string;
  read: string[];
  imgPath: string;
  appPath: string;
}

function AppCard({ title, lang, tags, info, read, imgPath }: Props) {
  // const { ref, height } = useElementSize();
  let BackgroundItem: { ref: RefObject<any>; width: number; height: number } =
    useElementSize();
  let { height, ref } = BackgroundItem;
  let refText: RefObject<HTMLParagraphElement> | null | undefined =
    useRef(null);
  return (
    <BackgroundImage src="assets/card-design.png" radius="" ref={ref}>
      <AspectRatio ratio={25 / 30}>
        <Box display={"block"}>
          <Center w={"100%"} h={"40%"} mt="xs">
            <ImageComponent imagePath={imgPath} h={"100%"} />
          </Center>
          <Box
            pt="2%"
            mx={"auto"}
            px="2px"
            h={"15%"}
            className={Style.parentAnimation}
          >
            <Text
              ref={refText}
              fz={(height * 8) / 100}
              ta={"center"}
              fw={"bold"}
              mx={"xs"}
              className={Style.textAnimation}
            >
              {title}
            </Text>
          </Box>
          <Flex
            mt="2%"
            gap=""
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Info
              path="assets/icons-2023/detials-icons/languages.png"
              data={lang}
              bgColor="#7D4680"
            />
            <Info
              path="assets/icons-2023/detials-icons/grades.png"
              data={tags}
              bgColor="#E7EF05"
            />
            <Info
              path="assets/icons-2023/detials-icons/subjects.png"
              data={read}
              bgColor="#799F2D"
            />
            <Info
              path="assets/icons-2023/detials-icons/info.png"
              data={info}
              bgColor="#ADAEAF"
            />
          </Flex>
          <Text fz={(height * 6) / 100} lineClamp={2} ta={"center"} mx={"xs"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            corrupti optio totam, in autem veritatis!
          </Text>
        </Box>
      </AspectRatio>
    </BackgroundImage>
  );
}

export default AppCard;
