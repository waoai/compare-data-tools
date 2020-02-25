import React from "react"
import { useEffect, useState } from "react"
import { styled, makeStyles } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import Selector, { SelectorProvider } from "./Selector"
import Result from "./Result"
import raw from "raw.macro"
import yaml from "js-yaml"

const data = yaml.load(raw("./data.yaml"))
data.sort(() => (Math.random() > 0.5 ? 1 : -1))

const Header = styled("div")({
  fontSize: 32,
  margin: 0,
  padding: 32,
  fontWeight: "bold",
  textAlign: "center",
  color: "#fff",
  textShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  backgroundColor: colors.blue[500],
  "& .sub": {
    marginTop: 20,
    fontWeight: "normal",
    textShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    fontSize: 18
  }
})

const SearchContainer = styled("div")({
  boxShadow: "inset 0px 3px 5px rgba(0,0,0,0.2)",
  fontSize: 24,
  padding: 32,
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: colors.grey[50],
  borderBottom: `1px solid ${colors.grey[300]}`
})

const ResultsContainer = styled("div")({
  backgroundColor: "#fff",
  minHeight: 200,
  paddingTop: 0,
  padding: 16,
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
})

const checkAgainstFilters = filters => item => {
  for (const filterKey of Object.keys(filters || {})) {
    if (
      filters[filterKey] === undefined ||
      filters[filterKey] === null ||
      filters[filterKey] === ""
    )
      continue
    const filterValue = filters[filterKey]

    switch (filterKey) {
      case "cloudOnly": {
        if (typeof item.cloudOnly !== "boolean") return false
        const good = filterValue === "yes" ? item.cloudOnly : !item.cloudOnly
        if (!good) return false
        continue
      }
      case "isOpenSource": {
        if (typeof item.isOpenSource !== "boolean") return false
        const good =
          filterValue === "yes" ? item.isOpenSource : !item.isOpenSource
        if (!good) return false
        continue
      }
      case "runsOn": {
        if (filterValue === "desktop") {
          if (item.installedToDesktop) continue
        }
        if (filterValue === "browser") {
          if (item.hasWebApp) continue
        }
        return false
      }
    }
  }
  return true
}

const parseBrowserForFilter = () => {
  const filters = {}
  const terms = window.location.search
    .slice(1)
    .split("&")
    .map(l => l.split("="))

  for (const [key, value] of terms) {
    filters[key] = value
  }
  return filters
}

export default () => {
  const [filters, changeFilters] = useState(parseBrowserForFilter())
  useEffect(() => {
    const newSearch = Object.keys(filters)
      .map(fkey => `${fkey}=${filters[fkey]}`)
      .join("&")

    const newURL = window.location.pathname + "?" + newSearch
    if (window.location.search !== newSearch) {
      window.history.pushState(document.title, document.title, newURL)
    }
  }, [filters])
  return (
    <div>
      <Header>
        Compare Data Tools
        <div className="sub">
          Find the best tools for working with datasets for machine learning and
          artificial intelligence.
        </div>
      </Header>
      <SearchContainer>
        <SelectorProvider initialValues={filters} onChange={changeFilters}>
          <Selector
            label="Cloud Only?"
            options={["Yes", "No"]}
            name="cloudOnly"
          />
          <Selector
            label="Open-Source"
            options={["Yes", "No"]}
            name="isOpenSource"
          />
          <Selector
            label="Runs on..."
            options={["Desktop", "Browser"]}
            name="runsOn"
          />
          <Selector
            label="Data Types"
            options={["Images", "PDFs", "Video", "Audio"]}
            name="dataTypes"
          />
          <Selector
            label="Input/Output"
            options={["CSV", "JSON", "XML"]}
            name="fileFormat"
          />
          <Selector
            label="Collaboration"
            options={["Yes", "No"]}
            name="supportsCollaboration"
          />
        </SelectorProvider>
      </SearchContainer>
      <ResultsContainer>
        {data.filter(checkAgainstFilters(filters)).map(result => (
          <Result key={result.name} {...result} />
        ))}
      </ResultsContainer>
    </div>
  )
}
