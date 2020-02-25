// @flow
import React from "react"
import * as colors from "@material-ui/core/colors"
import { styled } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { GoMarkGithub } from "react-icons/go"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import Divider from "@material-ui/core/Divider"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  maxWidth: 1000,
  width: "100%",
  margin: 20,
  border: `1px solid ${colors.grey[400]}`,
  boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
  borderRadius: 4,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}))

const LeftBlock = styled("div")(({ theme }) => ({
  width: 300,
  padding: 16,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "initial"
  }
}))

const RightBlock = styled("div")({
  flexGrow: 1,
  padding: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .thumbs-wrapper": { marginTop: 8, marginBottom: 0 },
  "& .thumbs-wrapper.axis-vertical": { marginTop: 8, marginBottom: 0 },
  "& .thumbs": { marginTop: 0, marginBottom: 0 },
  "& .thumb": {
    cursor: "pointer"
  },
  "& .thumb img": {
    maxHeight: 25,
    objectFit: "cover",
    border: `1px solid ${colors.grey[500]}`
  },
  "& img": {
    maxHeight: 400,
    backgroundColor: "#fff",
    objectFit: "cover",
    border: `1px solid ${colors.grey[500]}`
  }
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
  paddingBottom: 16,
  flexGrow: 1
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

const NoScreenshots = styled("div")({
  fontSize: 18,
  fontWeight: "bold",
  color: colors.grey[500]
})

export default ({
  name,
  useLink,
  githubLink,
  cloudOnly,
  isOpenSource,
  installedToDesktop,
  hasWebApp,
  license = "MIT",
  canBeIntegrated,
  collaboration,
  xml,
  json,
  csv,
  description,
  supportsNER,
  supportsVideo,
  supportsImageURLs,
  supportsDirectoryImport,
  screenshots
}) => {
  const tags = [
    cloudOnly && { label: "cloud", color: colors.purple[500] },
    hasWebApp && { label: "web", color: colors.blue[500] },
    installedToDesktop && { label: "desktop", color: colors.cyan[500] },
    canBeIntegrated && { label: "library", color: colors.orange[600] },
    isOpenSource && { label: "open-source", color: colors.green[500] }
  ].filter(Boolean)
  return (
    <Container>
      <LeftBlock>
        <Title>{name}</Title>
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
            {name}
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
            {name}
          </Button>
        )}
      </LeftBlock>
      <RightBlock>
        {screenshots.length > 0 ? (
          <Carousel showArrows={true} showStatus={false} showIndicators={false}>
            {screenshots.map(src => (
              <div key={src}>
                <img src={src} />
              </div>
            ))}
          </Carousel>
        ) : (
          <NoScreenshots>No Screenshots Yet!</NoScreenshots>
        )}
      </RightBlock>
    </Container>
  )
}
