import styled from "@emotion/styled";
import _ from "lodash";
import { bgColor, color } from "helpers";
import { theme } from "@chakra-ui/react";

type InjectWrapperProps = {
  colorMode: string;
};

const getColor = (object, index) => {
  if (object[index].includes(".")) {
    const splittedColor = object[index].split(".");
    return {
      color: _.first(splittedColor) as string,
      contrast: _.last(splittedColor as string),
    };
  } else {
    return object[index];
  }
};

export const InjectWrapper = styled.div<InjectWrapperProps>`
  ${({ colorMode }) => `
    .RichTextEditor__root___2QXK- {
      background-color: ${
        theme.colors[getColor(bgColor, colorMode).color][
          getColor(bgColor, colorMode).contrast
        ]
      };
      color: ${theme.colors[getColor(color, colorMode)]};
    }
    .DraftEditor-editorContainer {
      min-height: 200px;
      background-color: ${
        theme.colors[getColor(bgColor, colorMode).color][
          getColor(bgColor, colorMode).contrast
        ]
      };
      color: ${theme.colors[getColor(color, colorMode)]};
    }
  `}
`;
