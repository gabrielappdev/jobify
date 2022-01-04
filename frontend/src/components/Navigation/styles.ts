import styled from "@emotion/styled";

export const AnimatedWrapper = styled.div`
  ${({ color }) => `
    position: relative;
    z-index: 9999;
    top: 0px;
    left: 0;
    margin-top: -28px;
    border-top: 2px solid ${color};
    border-bottom: 2px solid ${color};
    background-color: ${color};
    box-sizing: border-box;
    opacity: 0;
    width: 100%;
    min-height: 28px;

    &.displayGlobalNotification {
      animation: slideDown 0.3s ease-in-out forwards;
    }
    &.hideGlobalNotification {
      animation: slideUp 0.3s ease-in-out forwards;
    }
    @keyframes slideDown {
      from {
        transform: translateY(-100px);
        opacity: 0;
      }
      to {
        transform: translateY(28px);
        opacity: 1;
      }
    }
    @keyframes slideUp {
      from {
        transform: translateY(0px);
        opacity: 1;
      }
      to {
        transform: translateY(-100px);
        opacity: 0;
      }
    }
  `}
`;
