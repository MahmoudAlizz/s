import {
  Image,
  Text,
  Center,
  Menu,
  BackgroundImage,
  ScrollArea,
  AspectRatio,
} from "@mantine/core";
import Style from "../../css-modules/global.module.css";
import { useViewportSize } from "@mantine/hooks";
interface Props {
  path: string;
  data: string[] | string;
  bgColor?: string;
}
const Info = ({ bgColor, path, data }: Props) => {
  const { width } = useViewportSize();

  return (
    <>
      <Menu
        shadow=""
        width={"auto"}
        trigger="hover"
        openDelay={75}
        closeDelay={0}
      >
        <Menu.Target>
          <Image radius="" h={"22%"} w={"22%"} src={path} />
        </Menu.Target>
        <Menu.Dropdown bg={bgColor ? bgColor : "#7D4680"}>
          {typeof data !== "string" ? (
            <ScrollArea
              h={{
                base: `${data.length < 4 ? "auto" : "75"}`,
                xs: `${data.length < 5 ? "auto" : "110"}`,
                md: `${data.length < 7 ? "auto" : "150"}`,
                lg: `${data.length < 6 ? "auto" : "175"}`,
              }}
              type="auto"
              scrollbarSize={(width * 0.5) / 100}
              scrollHideDelay={0}
              pr={{
                base: `${data.length < 4 ? "0px" : (width * 0.5) / 100}`,
                xs: `${data.length < 5 ? "0px" : (width * 0.5) / 100}`,
                md: `${data.length < 7 ? "0px" : (width * 0.5) / 100}`,
                lg: `${data.length < 6 ? "0px" : (width * 0.5) / 100}`,
              }}
            >
              {data.map((item: any, index: any) => {
                return (
                  <Menu.Item
                    key={index}
                    className={Style["menu-item"]}
                    py={{ base: "3px" }}
                    px={{ base: "5px" }}
                  >
                    <BackgroundImage
                      src="assets/item.png"
                      w={width > 748 ? (width * 9) / 100 : (width * 13) / 100}
                    >
                      <AspectRatio ratio={77 / 17} maw={250} mx="auto">
                        <Center>
                          <Text
                            size={
                              width > 748
                                ? `${(width * 1.1) / 100}px`
                                : `${(width * 1.4) / 100}px`
                            }
                            ta={"center"}
                            lineClamp={1}
                          >
                            {item}
                          </Text>
                        </Center>
                      </AspectRatio>
                    </BackgroundImage>
                  </Menu.Item>
                );
              })}
            </ScrollArea>
          ) : (
            <Menu.Item className={Style["menu-item"]} p={"5px"}>
              <BackgroundImage
                src="assets/item.png"
                w={width > 748 ? (width * 9) / 100 : (width * 13) / 100}
              >
                <AspectRatio ratio={77 / 17} maw={250} mx="auto">
                  <Center>
                    <Text
                      size={
                        width > 748
                          ? `${(width * 1.1) / 100}px`
                          : `${(width * 1.4) / 100}px`
                      }
                      ta={"center"}
                      lineClamp={1}
                    >
                      {data}
                    </Text>
                  </Center>
                </AspectRatio>
              </BackgroundImage>
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default Info;
