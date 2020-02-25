import React from "react"
import { useEffect, useState } from "react"
import { styled, makeStyles } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import Selector, { SelectorProvider } from "./Selector"
import Result from "./Result"
import raw from "raw.macro"
import yaml from "js-yaml"

const data = yaml.load(raw("./data.yaml"))

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

export default () => {
  const [filters, changeFilters] = useState()
  console.log({ data })
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
        <SelectorProvider onChange={changeFilters}>
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
        {data.map(result => (
          <Result key={result.name} {...result} />
        ))}
      </ResultsContainer>
    </div>
  )
}
