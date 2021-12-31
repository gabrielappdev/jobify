import styled from "@emotion/styled";

export const AnimatedWrapper = styled.div`
  ${({ color }) => `
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${color};
    padding: 16px;
    opacity: 0;
    width: 100%;

    &.displayGlobalNotification {
      animation: slideDown 0.3s ease-in-out forwards;
    }
    &.hideGlobalNotification {
      animation: slideUp 0.3s ease-in-out forwards;
    }
    @keyframes slideDown {
      from {
        transform: translateY(0px);
        opacity: 0;
      }
      to {
        transform: translateY(94px);
        opacity: 1;
      }
    }
    @keyframes slideUp {
      from {
        transform: translateY(94px);
        opacity: 1;
      }
      to {
        transform: translateY(0px);
        opacity: 0;
      }
    }
  `}
`;
