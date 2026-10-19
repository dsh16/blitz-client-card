const routerBase = process.env.NUXT_ROUTER_BASE || "/";

export default {
  telemetry: false,
  ssr: true,
  target: process.env.NUXT_DEPLOY_TARGET === "static" ? "static" : "server",
  router: { base: routerBase },
  generate: { fallback: "404.html" },
  components: true,
  css: [
    "@fontsource/inter/400.css",
    "@fontsource/inter/500.css",
    "@fontsource/inter/600.css",
    "@fontsource/inter/700.css",
    "~/assets/css/main.css",
  ],
  head: {
    title: "Карточка клиента · Blitz",
    htmlAttrs: { lang: "ru" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Карточка клиента: контакты, абонементы и история посещений.",
      },
      { name: "theme-color", content: "#147582" },
    ],
    link: [
      { rel: "icon", type: "image/svg+xml", href: `${routerBase}favicon.svg` },
    ],
  },
  build: { parallel: false },
};
