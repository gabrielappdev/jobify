import { Button, Flex, Tooltip } from "@chakra-ui/react";
import _ from "lodash";
import React, { SyntheticEvent } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

type SocialLinkCardProps = {
  data: {
    name: string;
    icon: string | React.ReactElement;
    color: string;
    url: string;
  };
  isRemovable: Boolean;
  onRemove: (event: SyntheticEvent) => void;
};

const getIcon = (iconName) => {
  const icons = {
    facebook: <FaFacebook />,
    twitter: <FaTwitter />,
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
  };

  return icons[iconName];
};

type RemovableWrapperProps = {
  children: React.ReactElement;
  onRemove: (event: SyntheticEvent) => void;
};

const RemovableWrapper = ({ children, onRemove }: RemovableWrapperProps) => {
  return (
    <Tooltip label="Click to remove" hasArrow>
      <div onClick={onRemove}>{children}</div>
    </Tooltip>
  );
};

const SocialLinkCard = ({
  data,
  isRemovable,
  onRemove,
}: SocialLinkCardProps) => {
  const Link = (
    <a
      style={{ width: "max-content" }}
      href={data.url}
      rel="norefferer noopener"
      target="_blank"
    >
      <Button
        colorScheme={data.color}
        variant={data.name !== "github" ? "solid" : "outline"}
        leftIcon={_.isString(data.icon) ? getIcon(data.icon) : data.icon}
      >
        {_.capitalize(data.name)}
      </Button>
    </a>
  );
  if (isRemovable) {
    return <RemovableWrapper onRemove={onRemove}>{Link}</RemovableWrapper>;
  }
  return Link;
};

export default SocialLinkCard;
