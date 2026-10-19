export default {
  telemetry: false,
  ssr: true,
  target: "server",
  components: true,
  css: ["~/assets/css/main.css"],
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
    link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  },
  build: { parallel: false },
};
