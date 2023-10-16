import { ReactNode, useEffect, useState } from "react";
import {
  AppShell,
  useDirection,
  Burger,
  Flex,
  Text,
  Anchor,
} from "@mantine/core";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { useParams } from "react-router-dom";
import i18n from "../../i18n";
import { useDisclosure } from "@mantine/hooks";
import { TbFilterCancel } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { data } from "../../data/new-data";

interface Props {
  children: ReactNode;
  setCategorySelected: (string: string) => void;
  CategorySelected: string;
}
function Layout({ CategorySelected, children, setCategorySelected }: Props) {
  const { toggleDirection, dir } = useDirection();

  const { lang } = useParams();
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure();
  const [catName, setCatName] = useState("");
  let item = data.cats.find(
    (item) =>
      item.ArCategory === CategorySelected ||
      item.EnCategory === CategorySelected
  );
  const handelCatName = () => {
    if (item !== undefined) {
      lang === "en" ? setCatName(item.EnCategory) : setCatName(item.ArCategory);
    }
  };

  useEffect(() => {
    if (lang !== i18n.language) {
      if (
        lang &&
        (lang.toLowerCase() === "ar" || lang.toLowerCase() === "en")
      ) {
        i18n.changeLanguage(lang.toLowerCase());
      }
    }
  }, [lang]);

  useEffect(() => {
    if (i18n.language === "ar") {
      toggleDirection();
    }
  }, []);

  useEffect(() => {
    handelCatName();
  }, [lang, CategorySelected]);
  return (
    <AppShell
      zIndex={100}
      withBorder={false}
      transitionDuration={500}
      transitionTimingFunction="ease"
      header={{ height: { base: 40, md: 60, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: "xs",
        collapsed: { mobile: !opened },
      }}
      pl=""
    >
      <AppShell.Header zIndex={150}>
        <Flex justify="flex-start" align="center" direction="row" gap={"xs"}>
          <Burger
            pos={"absolute"}
            opened={opened}
            onClick={toggle}
            size="md"
            hiddenFrom="xs"
            mt={"sm"}
            styles={{ root: { top: "60px" } }}
          />
          <Navbar />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar bg="#7D4680">
        <SideBar
          CategorySelected={CategorySelected}
          setCategorySelected={setCategorySelected}
        />
      </AppShell.Navbar>
      <AppShell.Main bg="#7D4680">
        <Flex pt={"2px"} pl="lg" direction={"row"} h={"25px"}>
          {CategorySelected !== "" ? (
            <Anchor onClick={() => setCategorySelected("")}>
              <TbFilterCancel size={"1.2rem"} color="79A32E" />
            </Anchor>
          ) : (
            ""
          )}
          <Text
            pl={dir === "ltr" ? "md" : ""}
            pr={dir === "rtl" ? "md" : ""}
            size="sm"
            c={"#ffffff"}
            lineClamp={1}
          >
            {CategorySelected !== "" ? `${t("categories")} : ` + catName : ""}
          </Text>
        </Flex>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
