module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{png,json,ico,html,js}"],
  swDest: "dist/service-worker.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  
};
