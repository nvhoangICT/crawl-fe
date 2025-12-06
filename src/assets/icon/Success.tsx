import * as React from "react";

function SuccessIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={155}
      height={155}
      viewBox="0 0 155 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M116.096 48.146a5.857 5.857 0 01.017 8.283L66.76 105.982a5.857 5.857 0 01-8.283.017L40.48 88.075a5.857 5.857 0 018.266-8.3l13.848 13.79 45.22-45.402a5.857 5.857 0 018.283-.017z"
        fill="#47BE29"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.659 11.714c-31.048 0-57.094 21.68-63.78 50.722a65.55 65.55 0 00-1.665 14.723c0 36.116 29.328 65.444 65.445 65.444 36.116 0 65.444-29.328 65.444-65.444 0-36.117-29.328-65.445-65.444-65.445zM2.463 59.808C10.345 25.57 41.03 0 77.66 0c42.586 0 77.158 34.572 77.158 77.159 0 42.586-34.572 77.158-77.158 77.158C35.072 154.317.5 119.745.5 77.159c0-5.96.678-11.768 1.963-17.351z"
        fill="#52B249"
      />
    </svg>
  );
}

export default SuccessIcon;
