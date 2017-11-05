export default function setupRoutes(router) {
  router.get("/", (req, res, next) => {
    next();
  });
}
