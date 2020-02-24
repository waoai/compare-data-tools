import React from "react"
import { useEffect, useState } from "react"
import { styled, makeStyles } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import Selector from "./Selector"
import Result from "./Result"
import data from "./data.yaml"

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
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
})

export default () => {
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
        <Selector label="Cloud Only?" options={["Yes", "No"]} />
        <Selector label="Open-Source" options={["Yes", "No"]} />
        <Selector label="Runs on..." options={["Desktop", "Browser"]} />
        <Selector
          label="Data Types"
          options={["Images", "PDFs", "Video", "Audio"]}
        />
        <Selector label="Input/Output" options={["CSV", "JSON", "XML"]} />
        <Selector label="Collaboration" options={["Yes", "No"]} />
      </SearchContainer>
      <ResultsContainer>
        <Result
          title="Universal Data Tool"
          useLink="https://universaldatatool.com"
          githubLink="https://github.com/UniversalDataTool/universal-data-tool"
          isCloud={false}
          isOpenSource
          isDesktopApp
          isWebApp
          license="MIT"
          isLibrary
          collaboration={false}
          xml={false}
          json
          csv
          description={`Label any type of data, images, text, or documents, in an easy web interface or desktop app.`}
          supportsNER
          supportsVideo={false}
          supportsImageURLs
          supportsDirectoryImport
        />
        <Result
          title="Label Box"
          description={`A complete solution for your training data problem with fast labeling tools, human workforce, data management, a powerful API and automation features.`}
          useLink="https://labelbox.com"
          githubLink="https://github.com/UniversalDataTool/universal-data-tool"
          isCloud
          isOpenSource={false}
          isDesktopApp={false}
          isWebApp
          license="MIT"
          isLibrary={false}
          collaboration={false}
          xml={false}
          json
          csv
          supportsNER
          supportsVideo={false}
          supportsImageURLs
          supportsDirectoryImport
        />
      </ResultsContainer>
    </div>
  )
}
