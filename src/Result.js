// @flow
import React from "react"
import * as colors from "@material-ui/core/colors"
import { styled } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { GoMarkGithub } from "react-icons/go"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import Divider from "@material-ui/core/Divider"

const Container = styled("div")({
  display: "flex",
  maxWidth: 800,
  width: "100%",
  margin: 20,
  border: `1px solid ${colors.grey[400]}`,
  boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
  borderRadius: 4
})

const LeftBlock = styled("div")({
  width: 300,
  padding: 16
})

const RightBlock = styled("div")({
  flexGrow: 1
})

const Title = styled("div")({
  fontSize: 24,
  borderBottom: `2px solid ${colors.blue[500]}`,
  display: "inline-flex"
})

const TagContainer = styled("div")({
  paddingTop: 16,
  paddingBottom: 16
})

const DescriptionContainer = styled("div")({
  paddingTop: 16,
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
  description,
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
  return (
    <Container>
      <LeftBlock>
        <Title>{title}</Title>
        <TagContainer>
          {tags.map(({ label, color }) => (
            <Tag style={{ backgroundColor: color }}>{label}</Tag>
          ))}
        </TagContainer>
        <Divider />
        <DescriptionContainer>{description}</DescriptionContainer>
        <Divider style={{ marginBottom: 16 }} />
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
      </LeftBlock>
      <RightBlock>asd</RightBlock>
    </Container>
  )
}
