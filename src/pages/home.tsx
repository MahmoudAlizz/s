import { useState } from "react";
import Layout from "../components/layout";
import ListAppsCarousel from "../components/list-apps-carousel";
import { searchapps } from "../searchContext";
function Home() {
  const [categorySelected, setCategorySelected] = useState("");
  const [searchValue, setsearchValue] = useState("");
  return (
    <searchapps.Provider value={{ searchValue, setsearchValue }}>
      <Layout
        CategorySelected={categorySelected}
        setCategorySelected={(category) => setCategorySelected(category)}
      >
        <ListAppsCarousel categorySelected={categorySelected} />
      </Layout>
    </searchapps.Provider>
  );
}

export default Home;
