import { Route, BrowserRouter } from "react-router-dom";
import * as routes from "./Routes";
import Post from "../pages/Product/Post";
import PostDetail from "../pages/Product/PostDetail";

const postDetailSlug = (match) => {
  return <PostDetail id={match.match.params.pathname} />;
};

export default function RoutePages() {
  return (
    <BrowserRouter>
      <Route exact path={routes.LANDING} component={Post} />
      <Route exact path={routes.PRODUCT} component={Post} />
      <Route exact path={routes.PRODUCT_DETAIL} component={postDetailSlug} />
    </BrowserRouter>
  );
}
