import { ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AspectRatio,
  Input,
  Image,
  useDirection,
  Group,
  Button,
  Grid,
  BackgroundImage,
  Center,
  Flex,
} from "@mantine/core";
import Style from "../../css-modules/global.module.css";
import { useElementSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { searchapps } from "../../searchContext";
interface Props {}
function Navbar({}: Props) {
  const { searchValue, setsearchValue } = useContext(searchapps);

  const navbarSize = useElementSize();
  const { height, ref } = navbarSize;
  const { toggleDirection, dir } = useDirection();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const sendSearchValue = () => {
    setsearchValue(inputValue);
  };
  useEffect(() => {
    if (inputValue == "") {
      sendSearchValue();
    }
  }, [inputValue]);
  return (
    <Grid
      ref={ref}
      justify="space-between"
      mx={0}
      pl={dir == "ltr" ? { base: "0px", md: "md" } : { base: "0px" }}
      pr={dir == "rtl" ? { base: "0px", md: "md" } : { base: "0px" }}
      w={"100%"}
    >
      <Grid.Col span={"content"}>
        <Center h={"100%"}>
          <Image
            p="3px"
            h={{ base: 40, md: 60, lg: 80 }}
            w="auto"
            src={"assets/thaki-logo.png"}
          />
        </Center>
      </Grid.Col>
      <Grid.Col span={{ base: 8 }}>
        <Center w="100%" h={"100%"}>
          <Grid justify="center" columns={20} w={"100%"}>
            <Grid.Col span={"content"} px={0}>
              <Button variant="transparent" p={0}>
                <Image
                  h={{ base: "18", xs: "20", sm: "25", md: "30" }}
                  w={"auto"}
                  radius="md"
                  src="assets/icons-2023/top-icons/home.png"
                />
              </Button>
            </Grid.Col>
            <Grid.Col span={"content"} px={0}>
              <Button variant="transparent" p={0}>
                <Image
                  h={{ base: "18", xs: "20", sm: "25", md: "30" }}
                  w={"auto"}
                  radius="md"
                  src="assets/icons-2023/top-icons/tags.png"
                />
              </Button>
            </Grid.Col>
            <Grid.Col span={"content"} px={0}>
              <Button variant="transparent" p={0}>
                <Image
                  h={{ base: "18", xs: "20", sm: "25", md: "30" }}
                  w={"auto"}
                  radius="md"
                  src="assets/icons-2023/top-icons/questions.png"
                />
              </Button>
            </Grid.Col>
            <Grid.Col span={"content"} px={0}>
              <Flex align="center">
                <BackgroundImage
                  h={{ base: "18", xs: "20", sm: "25", md: "30" }}
                  w={{ base: "110", xs: "140", sm: "150", md: "200" }}
                  src="assets/icons-2023/top-icons/search.png"
                  px="xs"
                >
                  <Center h={"100%"}>
                    <Input
                      placeholder={`${t("search")}...`}
                      value={inputValue}
                      onChange={(event) => {
                        setInputValue(event.currentTarget.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          sendSearchValue();
                        }
                      }}
                      variant="unstyled"
                      c={"black"}
                      size={`${(height * 18) / 100}px`}
                      fz={"1px"}
                      classNames={{
                        input: Style["input-search"],
                      }}
                    />
                  </Center>
                </BackgroundImage>
                <Button variant="transparent" p="0" onClick={sendSearchValue}>
                  <Image
                    src={"assets/icons-2023/top-icons/search-icon.png"}
                    h={{ base: "20", sm: "25", md: "30" }}
                    w={"auto"}
                    radius=""
                  />
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </Center>
      </Grid.Col>
      <Grid.Col span={{ base: 1 }}>
        <Center h={"100%"} w="100%">
          <Button
            ml={dir == "ltr" ? "auto" : ""}
            mr={dir == "rtl" ? "auto" : ""}
            h={{ base: "20", sm: "25", md: "40" }}
            variant="transparent"
            p="0"
            onClick={() => {
              if (i18n.language == "en") {
                i18n.changeLanguage("ar");
              } else if (i18n.language == "ar") {
                i18n.changeLanguage("en");
              }
              navigate(`/${i18n.language}`);
              toggleDirection();
            }}
          >
            <Image
              radius="0px"
              h={{ base: "20", sm: "25", md: "40" }}
              w={"auto"}
              src={
                dir == "ltr"
                  ? "assets/icons-2023/top-icons/change-lang-en.png"
                  : "assets/icons-2023/top-icons/change-lang-en.png"
              }
            />
          </Button>
        </Center>
      </Grid.Col>
    </Grid>
  );
}

export default Navbar;
