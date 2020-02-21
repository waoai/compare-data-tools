// @flow
import React from "react"
import * as colors from "@material-ui/core/colors"
import { styled } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { GoMarkGithub } from "react-icons/go"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"

const Container = styled("div")({
  display: "flex",
  maxWidth: 800,
  width: "100%",
  margin: 20,
  border: `1px solid ${colors.grey[300]}`
})

const LeftBlock = styled("div")({
  width: 300,
  padding: 16
})

const MiddleBlock = styled("div")({
  flexGrow: 1
})

const RightBlock = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 200,
  padding: 8
})

const Title = styled("div")({
  fontSize: 24,
  borderBottom: `2px solid ${colors.blue[500]}`,
  display: "inline-flex"
})

const TagContainer = styled("div")({
  paddingTop: 32,
  paddingBottom: 16
})

const Tag = styled("div")({
  display: "inline-flex",
  margin: 2,
  padding: 4,
  paddingLeft: 6,
  paddingRight: 6,
  color: "#fff",
  fontWeight: "bold",
  borderRadius: 4
})

export default ({
  title,
  useLink,
  githubLink,
  isCloud,
  isOpenSource,
  isDesktopApp,
  isWebApp,
  license = "MIT",
  isLibrary,
  collaboration,
  xml,
  json,
  csv,
  supportsNER,
  supportsVideo,
  supportsImageURLs,
  supportsDirectoryImport
}) => {
  const tags = [
    isCloud && { label: "cloud", color: colors.purple[500] },
    isWebApp && { label: "web", color: colors.blue[500] },
    isDesktopApp && { label: "desktop", color: colors.cyan[500] },
    isLibrary && { label: "library", color: colors.orange[600] },
    isOpenSource && { label: "open-source", color: colors.green[500] }
  ].filter(Boolean)
  console.log({ tags })
  return (
    <Container>
      <LeftBlock>
        <Title>{title}</Title>
        <TagContainer>
          {tags.map(({ label, color }) => (
            <Tag style={{ backgroundColor: color }}>{label}</Tag>
          ))}
        </TagContainer>
      </LeftBlock>
      <MiddleBlock>asd</MiddleBlock>
      <RightBlock>
        <Box flexGrow={1} />
        {useLink && (
          <Button
            fullWidth
            style={{
              textTransform: "none",
              fontSize: 14,
              backgroundColor: colors.blue[500],
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 8
            }}
            variant="outlined"
          >
            <OpenInNewIcon style={{ marginRight: 8, width: 14, height: 14 }} />
            {title}
          </Button>
        )}
        {isOpenSource && (
          <Button
            fullWidth
            style={{
              textTransform: "none",
              fontSize: 14,
              backgroundColor: colors.grey[800],
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 8
            }}
            variant="outlined"
          >
            <GoMarkGithub style={{ marginRight: 8, width: 14, height: 14 }} />
            {title}
          </Button>
        )}
      </RightBlock>
    </Container>
  )
}
