import "@mantine/carousel/styles.css";
import Style from "../../css-modules/global.module.css";
import { Grid, Image, useDirection, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import AppCard from "./item";
import { data } from "../../data/new-data";
import { useContext, useEffect, useState } from "react";
import i18n from "../../i18n";
import { useViewportSize, useElementSize } from "@mantine/hooks";
import { searchapps } from "../../searchContext";
interface AppType {
  EnTitle: string;
  ArTitle: string;
  catId: string;
  contentId: number;
  EnLeadText: string;
  ArLeadText: string;
  EnDescription: string;
  ArDescription: string;
  image: string;
  runPath: string;
  filePath: string;
  EnTagArray: string[];
  ArTagArray: string[];
}
interface Props {
  categorySelected: string;
}

function ListAppsCarousel({ categorySelected }: Props) {
  const { searchValue } = useContext(searchapps);

  const { toggleDirection, dir } = useDirection();
  const [numberOfCard, setNumberOfCards] = useState(18);
  const [heightNavbar, setHeightNavbar] = useState(0);
  const [, setC] = useState("");
  const base = useMediaQuery("(min-width: 0em)");
  const xs1 = useMediaQuery("(min-width: 33rem)");
  const xs = useMediaQuery("(min-width: 34rem)");
  const sm = useMediaQuery("(min-width: 48em)");
  const sm1 = useMediaQuery("(min-width: 56rem)");
  const md = useMediaQuery("(min-width: 62em)");
  const lg = useMediaQuery("(min-width: 75em)");
  useEffect(() => {
    if (lg) {
      setNumberOfCards(18);
      setHeightNavbar(80);
      setC("red");
    } else if (md) {
      setC("blue");

      setNumberOfCards(8);
      setHeightNavbar(60);
    } else if (sm) {
      setNumberOfCards(6);
      setC("green");
    } else if (sm1) {
      setNumberOfCards(9);
      setC("yellow");
    } else if (xs) {
      setHeightNavbar(50);
      setNumberOfCards(6);
      setC("dark");
    } else {
      setHeightNavbar(40);
      setNumberOfCards(6);
      setC("red");
    }
  }, [xs, sm, md, lg]);

  const heiehtView = useViewportSize().height;
  const widthView = useViewportSize().width;
  console.log("Width : ", widthView);
  console.log("Hight : ", heiehtView);

  const { ref, height, width } = useElementSize();

  let catIdToFilter: number | undefined = 0;

  catIdToFilter = data.cats.find(
    (item) =>
      item.EnCategory == categorySelected || item.ArCategory == categorySelected
  )?.id;

  const apps = data.app.filter((item) => {
    if (categorySelected === "" || item.catId === catIdToFilter) {
      if (
        (searchValue !== "" &&
          (item.EnTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.ArTitle.toLowerCase().includes(searchValue.toLowerCase()))) ||
        searchValue === ""
      ) {
        return true;
      }
    } else return false;
  });
  let currentPage = 1;
  const numberOfPages = apps.length / numberOfCard;
  let lastIndex, firstIndex: number;
  let pages: any[] = [];

  for (let index = 0; index < numberOfPages; index++) {
    lastIndex = currentPage * numberOfCard;
    firstIndex = lastIndex - numberOfCard;
    pages[index] = apps.slice(firstIndex, lastIndex);
    currentPage = currentPage + 1;
  }
  const widthIndicator = width;

  if (apps.length == 0) {
    return (
      <Text size="xl" fw={900} ta={"center"} c="red">
        No applications found
      </Text>
    );
  } else
    return (
      <Carousel
        // bg={color}
        ref={ref}
        styles={{
          control: {
            background: "none",
            border: "none",
            boxShadow: "none",
            width: "8%",
          },
          indicator: {
            background: "yellow",
            borderRadius: "100%",
            width: `${(width * 1.2) / 100}px`,
            height: `${(width * 1.2) / 100}px`,
          },
          indicators: {
            top: "100%",
            paddingTop: "7px",
          },
        }}
        withIndicators
        pt={
          lg
            ? ""
            : categorySelected == ""
            ? `${(heiehtView - heightNavbar - height) / 2.5}px`
            : `${(heiehtView - heightNavbar - height - 20) / 2.5}px`
        }
        nextControlIcon={
          dir == "ltr" ? (
            <Image
              radius=""
              w={{ base: "80%", sm: "85%", lg: "70%" }}
              h="auto"
              src="assets/icons-2023/right-nav.png"
            />
          ) : (
            <Image
              radius=""
              w={{ base: "80%", sm: "85%", lg: "70%" }}
              h="auto"
              src="assets/icons-2023/left-nav.png"
            />
          )
        }
        previousControlIcon={
          dir == "ltr" ? (
            <Image
              radius=""
              w={{ base: "80%", sm: "85%", lg: "70%" }}
              h="auto"
              src="assets/icons-2023/left-nav.png"
            />
          ) : (
            <Image
              radius=""
              w={{ base: "80%", sm: "85%", lg: "70%" }}
              h="auto"
              src="assets/icons-2023/right-nav.png"
            />
          )
        }
        mih={"75vh"}
      >
        {pages.map((page, index) => {
          return (
            <Carousel.Slide key={index}>
              <Grid mx={"80"}>
                {page.map((item: AppType, index: number) => {
                  return (
                    <Grid.Col
                      span={{ base: 4, md: 3, lg: 2 }}
                      px={"md"}
                      key={index}
                    >
                      {i18n.language == "en" ? (
                        <AppCard
                          title={item.EnTitle}
                          description={item.EnLeadText}
                          lang={item.EnTagArray}
                          tags={item.EnTagArray}
                          read={item.EnTagArray}
                          info={item.EnDescription}
                          imgPath={item.image}
                          appPath={item.runPath}
                        />
                      ) : (
                        <AppCard
                          title={item.ArTitle}
                          description={item.ArLeadText}
                          lang={item.ArTagArray}
                          tags={item.ArTagArray}
                          read={item.ArTagArray}
                          info={item.ArDescription}
                          imgPath={item.image}
                          appPath={item.runPath}
                        />
                      )}
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    );
}

export default ListAppsCarousel;
