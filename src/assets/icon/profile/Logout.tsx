import * as React from "react";

function Logout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 10.7C8.6134 10.7 8.3 10.3866 8.3 10C8.3 9.6134 8.6134 9.3 9 9.3L9 10.7ZM19.495 9.50502C19.7683 9.77839 19.7683 10.2216 19.495 10.495L15.0402 14.9497C14.7668 15.2231 14.3236 15.2231 14.0503 14.9497C13.7769 14.6764 13.7769 14.2332 14.0503 13.9598L18.0101 10L14.0503 6.0402C13.7769 5.76683 13.7769 5.32362 14.0503 5.05025C14.3236 4.77688 14.7668 4.77688 15.0402 5.05025L19.495 9.50502ZM9 9.3L19 9.3L19 10.7L9 10.7L9 9.3Z"
        fill="black"
      />
      <path
        d="M12 6.5V5.5C12 4.11929 10.8807 3 9.5 3H7.5C6.11929 3 5 4.11929 5 5.5V14.5C5 15.8807 6.11929 17 7.5 17H9.5C10.8807 17 12 15.8807 12 14.5V14"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Logout;
