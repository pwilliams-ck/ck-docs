import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";

import logo from "./public/ck-logo-x-color.png";

const config: DocsThemeConfig = {
  logo: (
    <>
      <Image src={logo} alt="CloudKey Logo" height={200} width={200} />
    </>
  ),
  project: {
    link: "https://github.com/pwilliams-ck/ck-docs.git",
  },
  chat: {
    icon: null,
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/pwilliams-ck/ck-docs.git",
  footer: {
    text: "CloudKey Platform Docs",
  },
};

export default config;
